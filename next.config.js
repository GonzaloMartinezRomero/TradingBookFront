/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        TRADING_BOOK_API_ENDPOINT: process.env.TRADING_BOOK_API_ENDPOINT,
    },
    output:"export"
  }
