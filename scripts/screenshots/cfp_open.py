"""Open the 2027 call for proposals the way the live instance has it.

Run inside the summit instance after ``load_preset /community/presets/summit``,
with ``manage.py shell < cfp_open.py`` (run.sh does this). The preset leaves
2027's proposals closed; this opens them with the summit's own form:

- Talk (15 minutes) and Lightning talk (5 minutes, the Tools Track) are the
  only kinds open for proposals;
- prerequisites and language are not asked;
- two questions of the summit's own about the session, both links,
  optional, and read only by the organizers and reviewers;
- the summit's intro at the top of the form.

It also adds ``new_speaker``, an account with a verified email address and
no proposals yet, for the screenshots of someone proposing for the first
time. Password: password123, like every preset account.

Keep this in step with the instance's Speaker settings and Proposal
questions pages: the screenshots are only as true as this file.
"""

from allauth.account.models import EmailAddress
from django.contrib.auth.models import User

from portal.models import Conference
from portal_account.models import PortalProfile
from speakers.models import ProposalQuestion, SessionType, SpeakerSettings

YEAR = 2027
OPEN_KINDS = {"TALK": 15, "LIGHTNING": 5}
QUESTIONS = [
    "Links to blog post, articles, etc that the proposed talk will be based on",
    "Links to the slides or videos of your previous presentations",
]

INTRO = """\
We are taking proposals for the PyCon US Maintainer Summit 2027, a gathering for people who maintain open source Python projects.

Proposals close on **January 16, 2027**, and we will let everyone who proposed know the outcome by **February 1, 2027**.

Two kinds of session are open:

- **Talk**, 15 minutes. An experience, a practice or a lesson other maintainers can use. We would love to hear about responsible use of generative AI, developer workflows and tooling, security, community and governance, funding and resources, or anything else about keeping a Python project going.
- **Lightning talk**, 5 minutes, for the Tools Track. Updates or news about your project, tool or initiative: a new release, a feature maintainers should know about, a tool that saves time. Lightning talks run back to back in the Tools Track session.

Read the [call for proposals guide](https://pycon-maintainer-summit.github.io/docs/cfp-guide/) before you submit. You may submit up to three proposals, and you are welcome to propose the same talk you sent to the main PyCon US program.

All sessions are given in person. If you need help getting there, we strongly encourage you to apply for a PyCon US travel grant early.
"""

edition = Conference.objects.get(year=YEAR)

types = SessionType.objects.filter(conference=edition)
types.update(open_for_proposals=False)
for code, minutes in OPEN_KINDS.items():
    types.filter(code=code).update(
        open_for_proposals=True, default_duration_minutes=minutes
    )

SpeakerSettings.objects.filter(conference=edition).update(
    proposals_open=True,
    asks_prerequisites=False,
    asks_language=False,
    proposals_intro_md=INTRO,
)

for order, label in enumerate(QUESTIONS, start=1):
    ProposalQuestion.objects.update_or_create(
        conference=edition,
        label=label,
        defaults={
            "about": "SESSION",
            "kind": "LINKS",
            "required": False,
            "visibility": "TEAM",
            "order": order,
            "is_active": True,
        },
    )

user, _ = User.objects.get_or_create(
    username="new_speaker",
    defaults={"email": "new.speaker@example.org", "first_name": "Alex"},
)
user.set_password("password123")
user.save()
EmailAddress.objects.update_or_create(
    user=user,
    email=user.email,
    defaults={"verified": True, "primary": True},
)
PortalProfile.objects.update_or_create(
    user=user, defaults={"coc_agreement": True, "tos_agreement": True}
)

print(f"{edition}: proposals open for", ", ".join(OPEN_KINDS), "- sign in as new_speaker")
