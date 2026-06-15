import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
      {
        source: '/insights/choosing-the-right-tech-stack',
        destination: '/insights/how-ai-can-help-you-create-your-next-project',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
