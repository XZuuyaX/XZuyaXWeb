/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // turbo: { /* kalau mau pakai turbopack lagi nanti */ }
  },
};

export default nextConfig;
