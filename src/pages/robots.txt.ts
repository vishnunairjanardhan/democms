import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /tags/*
Disallow: /about-us
Disallow: /case-study1
Disallow: /loyalty-and-reward-management

User-agent: Pinterestbot
Disallow: /

User-agent: Pinterestbot
Disallow: /

Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};