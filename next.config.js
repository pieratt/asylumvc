/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    loader: 'custom',
    loaderFile: './cloudinaryLoader.js',
  },
  async rewrites() {
    return [
      {
        source: '/🎧',
        destination: '/listen',
      },
      {
        source: '/👀',
        destination: '/look',
      },
      {
        source: '/📖',
        destination: '/read',
      },
      {
        source: '/:user/🎧',
        destination: '/:user/listen',
      },
      {
        source: '/:user/👀',
        destination: '/:user/look',
      },
      {
        source: '/:user/📖',
        destination: '/:user/read',
      },
    ];
  },
};

module.exports = nextConfig;