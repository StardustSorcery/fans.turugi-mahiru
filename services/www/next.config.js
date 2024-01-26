/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });
    return config;
  },
  output: 'standalone',
  rewrites: () => {
    return [
      {
        source: '/__/auth/:path*',
        destination: process.env.NEXT_PUBLIC_FIREBASE_MODE === 'development'
          ? 'https://tsurugi-mahiru-schedule-dev.firebaseapp.com/__/auth/:path*'
          : 'https://tsurugi-mahiru-schedule.firebaseapp.com/__/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
