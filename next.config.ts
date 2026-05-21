const nextConfig = {
  basePath: "/attendance",
  assetPrefix: "/attendance",
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ["i.pinimg.com", "i1-c.pinimg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
      },
    ],
  },
};

export default nextConfig;
