/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
        TRADING_BOOK_API_ENDPOINT: process.env.TRADING_BOOK_API_ENDPOINT,
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        NEXT_PUBLIC_GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    }
}
