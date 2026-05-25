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
      {
        protocol: "http",
        hostname: "localhost",
        port: "8090",
      },
      {
        protocol: "http",
        hostname: "95.111.245.161",
        port: "8090",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
