/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dinnerchamp.sgp1.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
