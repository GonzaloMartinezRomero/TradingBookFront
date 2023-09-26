/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
        TRADING_BOOK_API_ENDPOINT: process.env.TRADING_BOOK_API_ENDPOINT,
    },
    async headers() {
        return [
          {
            // Routes this applies to
            source: "/api/(.*)",
            // Headers
            headers: [
              // Allow for specific domains to have access or * for all
              {
                key: "Access-Control-Allow-Origin",
                value: "*",              
              },
              // Allows for specific methods accepted
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              // Allows for specific headers accepted (These are a few standard ones)
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
      }

}
