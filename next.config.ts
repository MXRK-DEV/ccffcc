// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
  
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  typescript: {
      ignoreBuildErrors: true,
  },
  images:{
      remotePatterns:[
          {
              protocol: "https",
              hostname: "images.pexels.com"
          }
      ]
  }
};

export default nextConfig;
