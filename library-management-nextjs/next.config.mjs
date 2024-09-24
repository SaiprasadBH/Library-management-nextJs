/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "utfs.io"],
  },
};

export default withNextIntl(nextConfig);
