import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 /* config options here */
 output: 'export',
 basePath: '/rahem',
 turbopack: {
  rules: {
   '*.css': {
    loaders: ['@tailwindcss/turbopack'],
    as: '*.css',
   },
  },
 },
};

export default nextConfig;
