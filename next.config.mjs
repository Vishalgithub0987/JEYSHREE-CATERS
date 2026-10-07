/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: false },
      { source: '/home', destination: '/', permanent: false },
      { source: '/about-us', destination: '/#story', permanent: false },
      { source: '/services', destination: '/#services', permanent: false },
      { source: '/menus', destination: '/menu', permanent: false },
      { source: '/contact', destination: '/#reserve', permanent: false },
      { source: '/contact-us', destination: '/#reserve', permanent: false },
      { source: '/gallery', destination: '/#gallery', permanent: false },
      { source: '/blogs', destination: '/#blogs', permanent: false },
      { source: '/reviews', destination: '/#reviews', permanent: false },
      { source: '/testimonials', destination: '/#reviews', permanent: false },
      { source: '/faq', destination: '/#faq', permanent: false },
      { source: '/best-wedding-catering-services-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/corporate-catering-services-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/best-wedding-planners-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/event-planners-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/get-together-catering-services-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/engagement-catering-services-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/birthday-party-catering-services-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/catering-service-for-house-warming-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/puberty-function-catering-service-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/caterers-for-baby-showers-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/best-wedding-photographers-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/wedding-decorators-in-kv-kuppam', destination: '/#services', permanent: false },
      { source: '/veg-caterers', destination: '/#blogs', permanent: false },
      { source: '/wedding-caterers', destination: '/#blogs', permanent: false },
      { source: '/corporate-catering', destination: '/#blogs', permanent: false },
      { source: '/social-media', destination: '/#reserve', permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/images/logo.jpeg' },
    ];
  },
};

export default nextConfig;

