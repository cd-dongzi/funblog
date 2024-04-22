// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// const isDev = process.env.NODE_ENV === 'development';

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
  // async redirects() {
  //   return [
  //     ...(isDev
  //       ? [
  //           {
  //             source: '/api/:path*',
  //             destination: `http://localhost:${process.env.SERVER_PORT}/api/:path*`,
  //             permanent: true,
  //           },
  //         ]
  //       : []),
  //   ];
  // },
  webpack: (config) => {
    // config.optimization.minimize = false;
    return config;
  },
  experimental: {
    ppr: true,
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
};

module.exports = withBundleAnalyzer(nextConfig);
