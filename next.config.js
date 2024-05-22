require("dotenv").config();
const nextConfig = {
  env: {
    STORJ_ENDPOINT: process.env.STORJ_ENDPOINT,
    STORJ_ACCESS_KEY: process.env.STORJ_ACCESS_KEY,
    STORJ_SECRET_KEY: process.env.STORJ_SECRET_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.gateway.storjshare.io",
      },
    ],
  },
  rewrites: async () => {
    return [];
  },
};

module.exports = nextConfig;
