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
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "i1-c.pinimg.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/attendance/**",
      },
    ],
  },
};

export default nextConfig;
