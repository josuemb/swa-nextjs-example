/** @type {import('next').NextConfig} */

const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    disableStaticImages: true
  }
}

module.exports = withOptimizedImages(nextConfig)