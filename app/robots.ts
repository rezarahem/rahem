import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/css', '/login', '/api'],
      },
    ],
    sitemap: 'rahem.dev/sitemap.xml',
  };
};

export default robots;
