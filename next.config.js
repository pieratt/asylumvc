/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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