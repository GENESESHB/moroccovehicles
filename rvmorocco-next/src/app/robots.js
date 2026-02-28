import { MetadataRoute } from 'next';

// ✅ 2026: Base URL
const BASE_URL = 'https://moroccovehicles.com';

export default function robots() {
  return {
    rules: [
      // ✅ 2026: Default rule for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
          '/dashboard/',
          '/account/',
          '/settings/',
          '/checkout/',
          '/cart/',
          '/internal/',
          '/tmp/',
          '/temp/',
          '/draft/',
          '/preview/',
          '/test/',
          '/*.json$',
          '/*.xml$',
          '/search?',
        ],
        crawlDelay: 1,
      },
      
      // ✅ 2026: Googlebot specific rules
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
        ],
      },
      
      // ✅ 2026: Googlebot-Image for image SEO
      {
        userAgent: 'Googlebot-Image',
        allow: '/images/',
        allow: '/uploads/',
        disallow: '/assets/private/',
      },
      
      // ✅ 2026: Bingbot rules
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      
      // ✅ 2026: AI Crawlers - ChatGPT/GPTBot
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
          '/user-data/',
        ],
      },
      
      // ✅ 2026: AI Crawlers - ChatGPT-User (for ChatGPT browsing)
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
        ],
      },
      
      // ✅ 2026: AI Crawlers - Claude (Anthropic)
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
        ],
      },
      
      // ✅ 2026: AI Crawlers - Claude-Full (Anthropic full crawler)
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
        ],
      },
      
      // ✅ 2026: AI Crawlers - Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
        ],
      },
      
      // ✅ 2026: AI Crawlers - Google Extended (for AI training)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
        ],
      },
      
      // ✅ 2026: AI Crawlers - Applebot (for Apple Intelligence)
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
        ],
      },
      
      // ✅ 2026: Social Media Crawlers
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      
      // ✅ 2026: SEO Tools Crawlers
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'MJ12bot',
        allow: '/',
        crawlDelay: 2,
      },
      
      // ✅ 2026: Block specific bad bots
      {
        userAgent: 'BadBot',
        disallow: '/',
      },
      {
        userAgent: 'Scrapy',
        disallow: '/',
      },
    ],
    
    // ✅ 2026: Sitemap location (required)
    sitemap: `${BASE_URL}/sitemap.xml`,
    
    // ✅ 2026: Host directive (for Yandex and others)
    host: BASE_URL,
    
    // ✅ 2026: Additional sitemaps (images, videos, news)
    // sitemap: [
    //   `${BASE_URL}/sitemap.xml`,
    //   `${BASE_URL}/sitemap-images.xml`,
    //   `${BASE_URL}/sitemap-videos.xml`,
    //   `${BASE_URL}/sitemap-news.xml`,
    // ],
  };
}