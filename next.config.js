/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}
  },
  typescript: {
    // !! WARN !!
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
