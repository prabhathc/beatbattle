/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.discordapp.com'],
  },
  // Remove problematic redirect
  async redirects() {
    return [];
  },
};

export default nextConfig;
