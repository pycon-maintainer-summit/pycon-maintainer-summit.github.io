import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { site } from "../data/site";
import { formatAuthors } from "../lib/authors";

export async function GET(context: APIContext) {
  const posts = (await getCollection("news"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `${site.name} — News`,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      author: formatAuthors(post.data.author),
      categories: post.data.tags,
      link: `/news/${post.id}/`,
    })),
    customData: `<language>${site.locale.toLowerCase().replace("_", "-")}</language>`,
  });
}
