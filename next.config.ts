import { NextConfig } from "next";

const nextConfig:NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images:{
    domains: ["i.pinimg.com"]
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
