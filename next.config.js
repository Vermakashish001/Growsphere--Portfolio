/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now default in Next.js 14, no need for experimental config'
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig