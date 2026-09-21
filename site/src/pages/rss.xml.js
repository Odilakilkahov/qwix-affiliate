import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
export async function GET(context) {
  const items = [...(await getCollection('reviews')).filter(x=>!x.data.draft).map(x=>({title:x.data.title,description:x.data.description,pubDate:x.data.updatedAt,link:`/reviews/${x.id}/`})), ...(await getCollection('comparisons')).filter(x=>!x.data.draft).map(x=>({title:x.data.title,description:x.data.description,pubDate:x.data.updatedAt,link:`/comparisons/${x.id}/`}))].sort((a,b)=>b.pubDate-a.pubDate);
  return rss({ title: site.name, description: site.tagline, site: context.site ?? site.url, items });
}
