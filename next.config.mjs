/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (placeholder / hero images)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Local backend uploads (dev)
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      // Production backend — same domain or subdomain
      {
        protocol: "https",
        hostname: "hiddenpak.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.hiddenpak.com",
        pathname: "/uploads/**",
      },
      // Cloudinary (kept for any existing cloud-stored images)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Redirect old admin/login → new /admin-login
  async redirects() {
    return [
      {
        source: "/admin/login",
        destination: "/admin-login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
