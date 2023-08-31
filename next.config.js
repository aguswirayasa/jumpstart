/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    domains: ["images.tokopedia.net", "cf.shopee.co.id"],
  },
};

module.exports = nextConfig;
