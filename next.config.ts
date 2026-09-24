import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/industries/healthcare",  destination: "/industries/dental", permanent: false },
      { source: "/industries/real-estate", destination: "/industries/dental", permanent: false },
      { source: "/industries/legal",       destination: "/industries/dental", permanent: false },
    ];
  },
};

export default nextConfig;
