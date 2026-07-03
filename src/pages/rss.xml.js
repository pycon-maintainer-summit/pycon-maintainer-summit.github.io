import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context) {
  const allAuthors = await getCollection('authors');
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: SITE.rssTitle ?? SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => {
      const names = [
        ...post.data.authors.map((slug) => allAuthors.find((a) => a.id === slug)?.data.title ?? slug),
        ...post.data.guestAuthors.map((g) => g.name),
      ];
      if (!names.length && post.data.author) names.push(post.data.author);
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description ?? post.data.summary,
        author: names.join(', ') || undefined,
        categories: post.data.tags,
        link: `/news/${post.id}/`,
      };
    }),
  });
}