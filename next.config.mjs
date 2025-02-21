/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.anilist.co',
            port: '',
            search: '',
          },
        ],
      },
};

export default nextConfig;
