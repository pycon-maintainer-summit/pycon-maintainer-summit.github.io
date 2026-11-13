#!/bin/bash
# Take the proposal-form screenshots used in src/content/docs/cfp-guide.md.
#
#   scripts/screenshots/run.sh
#
# Runs the summit's own Flashlights instance (the image its repository
# builds, with the summit preset) as a separate compose project on
# http://127.0.0.1:8017/, opens the 2027 call for proposals with
# cfp_open.py, and saves the screenshots into public/images/docs/cfp-guide/.
# Every run starts from an empty database. Needs Docker, Node.js and
# ffmpeg. See README.md.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTANCE="${SUMMIT_FLASHLIGHTS:-$HOME/github/pycon-maintainer-summit/flashlights}"
export COMPOSE_PROJECT_NAME=summit-screenshots
export COMPOSE_FILE="$INSTANCE/compose.yml:$HERE/compose.shots.yml"
BASE_URL="http://127.0.0.1:8017"

[ -f "$INSTANCE/compose.yml" ] || { echo "No summit instance at $INSTANCE: set SUMMIT_FLASHLIGHTS" >&2; exit 1; }
[ -d "$HERE/node_modules" ] || (cd "$HERE" && npm install)

manage() { docker compose run --rm -T web python manage.py "$@"; }

docker compose down -v --remove-orphans
docker compose build web
manage createcachetable
manage migrate -v0
manage set_site_domain 127.0.0.1:8017
manage load_preset /community/presets/summit > /dev/null
manage shell < "$HERE/cfp_open.py"
docker compose up -d web worker maildev
until curl -sf -o /dev/null "$BASE_URL/speakers/propose/"; do sleep 1; done

SHOTS="$(cd "$HERE/../.." && pwd)/public/images/docs/cfp-guide"
BASE_URL="$BASE_URL" SHOTS="$SHOTS" node "$HERE/shoot-cfp.js"
# A grey border, so a screenshot reads as a picture of a page and not part of the guide.
for shot in "$SHOTS"/*.png; do
  ffmpeg -v error -y -i "$shot" -vf "pad=iw+8:ih+8:4:4:color=0xaeb4bd" "$shot.bordered.png"
  mv "$shot.bordered.png" "$shot"
done
docker compose down -v
