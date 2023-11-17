/** @type {import('next').NextConfig} */
//const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  images: {
    domains: ['downloader.disk.yandex.ru', 'avatars.yandex.net']
  },
  experimental: {
    instrumentationHook: true,
    serverActions: true
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