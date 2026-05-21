const nextConfig = {
  basePath: "/attendance",
  assetPrefix: "/attendance",
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
      },
    ],
  },
};

export default nextConfig;
