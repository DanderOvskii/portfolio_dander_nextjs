/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images2.alphacoders.com", "localhost"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/v1/uploads/**',
      }
    ]
  },
  async rewrites() {
    return [
      { source: "/login", destination: "/auth/login" },
      { source: "/signup", destination: "/auth/signup" },
      { source: "/admin", destination: "/admin/dashboard" },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/v1/uploads/:path*",
         headers: [
          {
            key: "Cache-Control",
            // Cache for 1 minute but validate freshness on each request
            value: "public, max-age=60, stale-while-revalidate=3600"
          }
        ],
      },
    ];
  },
};

export default nextConfig;