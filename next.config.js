/** @type {import('next').NextConfig} */
const cspPolicy = {
  // "default-src": "'self'",
  'script-src':
    "'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://smatbot.s3.amazonaws.com https://code.responsivevoice.org https://cdn.jsdelivr.net https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
  'style-src':
    "'self' 'unsafe-inline' https://fonts.googleapis.com https://smatbot.s3.amazonaws.com https://cdn.jsdelivr.net https://plugin.smatbot.com/smatbot.css.gz",

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
};

module.exports = nextConfig;
