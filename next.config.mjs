/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.discordapp.com'],
  },
  // Add Auth0 callback URLs to allowed redirects
  async redirects() {
    return [
      {
        source: '/api/auth/callback',
        destination: '/api/auth/callback',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;