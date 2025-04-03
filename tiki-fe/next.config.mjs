/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  logging: {
    fetches: {
      failed: true,
    },
  },
};

export default nextConfig;
