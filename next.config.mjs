/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'rahem.storage.iran.liara.space',
        //   },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'trustseal.enamad.ir',
          },
        ],
      },
      output: 'standalone',
};

export default nextConfig;
