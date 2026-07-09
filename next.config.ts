import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/en/insights',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/en/insights/:slug',
        permanent: true,
      },
      {
        source: '/:locale(en|pt)/blog',
        destination: '/:locale/insights',
        permanent: true,
      },
      {
        source: '/:locale(en|pt)/blog/:slug',
        destination: '/:locale/insights/:slug',
        permanent: true,
      },
      {
        source: '/insights/choosing-the-right-tech-stack',
        destination: '/en/insights/how-ai-can-help-you-create-your-next-project',
        permanent: true,
      },
      {
        source: '/:locale(en|pt)/insights/choosing-the-right-tech-stack',
        destination: '/:locale/insights/how-ai-can-help-you-create-your-next-project',
        permanent: true,
      },
    ]
  },
};

export default withNextIntl(nextConfig);
