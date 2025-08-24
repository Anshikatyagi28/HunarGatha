// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
  },
  // async redirects() {
  //   return [
  //     // dashboard → dashboard/user
  //     {
  //       source: "/dashboard",
  //       destination: "/dashboard/user",
  //       permanent: false,
  //     },
  //     // admin → login
  //     {
  //       source: "/admin/:path*",
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   ]
  // },
  // async rewrites() {
  //   return [
  //     // /hunarpath/... → /
  //     {
  //       source: "/hunarpath/:path*",
  //       destination: "/",
  //     },
  //     // /about/:id → /about
  //     {
  //       source: "/about/:id",
  //       destination: "/about",
  //     },
  //   ]
  // },
}

module.exports = nextConfig
