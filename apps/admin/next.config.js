/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.dzblog.cn',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // true 308永久重定向 false 307临时重定向
      },
      {
        source: '/setting',
        destination: '/setting/base',
        permanent: true,
      },
      {
        source: '/media',
        destination: '/media/image',
        permanent: true,
      },
      {
        source: '/post',
        destination: '/post/list',
        permanent: true,
      },
      {
        source: '/page',
        destination: '/page/menu',
        permanent: true,
      },
      {
        source: '/role-permission',
        destination: '/role-permission/user',
        permanent: true,
      },
    ];
  },
  modularizeImports: {
    '@funblog/utils': {
      transform: '@funblog/utils/lib/cjs/{{member}}',
    },
    '@funblog/hooks': {
      transform: '@funblog/hooks/lib/cjs/{{member}}',
    },
    '@funblog/components': {
      transform: '@funblog/components/lib/cjs/components/{{member}}',
    },
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
