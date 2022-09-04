// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    // localeDetection: false,
  },
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  env: {
    API_URL: 'https://betslive724.herokuapp.com',
    GTAG: 'G-QPNYZ5ZE0K',
    // API_URL: 'http://localhost:1337',
  },
}

module.exports = nextConfig
