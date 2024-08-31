
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (isServer && config.name === "server") {
  //     return merge(config, {
  //       entry() {
  //         return config.entry().then((entry) => {
  //           return Object.assign({}, entry, {
  //             "update_access.worker": path.resolve(
  //               process.cwd(),
  //               "workers/update_access.worker.ts"
  //             ),
  //           });
  //         });
  //       },
  //     });
  //   } else {
  //     return config;
  //   }
  // },
};

module.exports = nextConfig;
