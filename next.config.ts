import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/techv2",                 destination: "/tech",              permanent: true },
      { source: "/industries/healthcare",  destination: "/industries/dental", permanent: false },
      { source: "/industries/real-estate", destination: "/industries/dental", permanent: false },
      { source: "/industries/legal",       destination: "/industries/dental", permanent: false },
    ];
  },
};

export default nextConfig;
