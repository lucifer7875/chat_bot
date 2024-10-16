/** @type {import('next').NextConfig} */
const cspPolicy = {
  // "default-src": "'self'",
  'script-src':
    "'self' 'unsafe-inline' https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js https://code.responsivevoice.org/responsivevoice.js https://cdn.jsdelivr.net/npm/pikaday/pikaday.min.js https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
  'style-src':
    "'self' 'unsafe-inline' https://fonts.googleapis.com/icon?family=Material+Icons https://plugin.smatbot.com/smatbot.css.gz https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.min.css",

  'font-src':
    "'self' https://fonts.gstatic.com data: https://s3.amazonaws.com http://localhost:3000 http://www.giftgujarat.in https://www.giftgujarat.in https://chat-bot-chi-six.vercel.app/ https://shopestablishment.giftgujarat.in",
  // "img-src": "'self' 'data:' https://custpostimages.s3.ap-south-1.amazonaws.com https://s3.ap-south-1.amazonaws.com https://s3.ap-south-1.amazonaws.com https://gift-web-assets.s3.ap-south-1.amazonaws.com https://assets.giftgujarat.in http://giftgujarat.devitsandbox.com http://localhost:3000 https://www.giftgujarat.in https://chat-bot-chi-six.vercel.app/ https://shopestablishment.giftgujarat.in http://localhost:5001 https://api.giftgujarat.in blob:http://localhost:3000 http://localhost:3000",
  'object-src': "'none'",
  'frame-ancestors': "'none'",
  'media-src':
    "'self' https://assets.giftgujarat.in http://giftgujarat.devitsandbox.com https://custpostimages.s3.ap-south-1.amazonaws.com https://gift-web-assets.s3.ap-south-1.amazonaws.com http://localhost:3000 https://www.giftgujarat.in https://chat-bot-chi-six.vercel.app/ https://shopestablishment.giftgujarat.in https://api.giftgujarat.in http://localhost:5001 https://admingiftgujarat.devitsandbox.com",
  'connect-src':
    "'self' https://admingiftgujarat.devitsandbox.com https://www.smatbot.com https://www.google-analytics.com http://localhost:5001 https://api.giftgujarat.in wss://www.smatbot.com https://www.google.com",
};


const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      tls: false,
      child_process: false,
    };

    return config;
  },
  output: 'standalone',
  experimental: {
    outputStandalone: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // or 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: Object.entries(cspPolicy)
              .map(([directive, value]) => `${directive} ${value}`)
              .join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'master-only',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
          {
            key: 'Feature-Policy',
            value: "geolocation 'self'; microphone 'none'; camera 'none';",
          },
          {
            key: 'Expect-CT',
            value:
              'max-age=86400, enforce, report-uri="https://chat-bot-chi-six.vercel.app/"',
          },
        ],
      },
    ];
  },
  // redirects function is use only in https://shopestablishment.giftgujarat.in sub domain
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
