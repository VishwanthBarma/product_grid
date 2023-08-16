/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i.gadgets360cdn.com",
      "www.india.com",
      "images.hindustantimes.com",
      "trak.in",
    ], // Add your hostname here
  },
};

module.exports = nextConfig;
