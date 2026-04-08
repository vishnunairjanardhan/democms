import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort((a, b) => {
    const aDate = a.data.lastUpdated || a.data.pubDate;
    const bDate = b.data.lastUpdated || b.data.pubDate;
    return new Date(bDate) - new Date(aDate);
  });
  return rss({
    title: '99minds | Blog',
    description: '99minds | Blog',
    site: 'https://www.99minds.io',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}`,
    })),
    customData: `<language>en-us</language>`,
  });
}