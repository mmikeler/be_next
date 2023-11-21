/** @type {import('next').NextConfig} */
//const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.yandex.ru',
      },
      {
        protocol: 'https',
        hostname: '**.yandex.net',
      },
      {
        protocol: 'https',
        hostname: 'miniw3b.ru',
      },
      {
        protocol: 'https',
        hostname: '**.miniw3b.ru',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
  // Other rules...
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      zlib: false,
      http: false,
      https: false,
    };

    return config;
  },
}