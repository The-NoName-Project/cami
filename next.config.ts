import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: ["@prisma/client", "prisma"],
    outputFileTracing: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (isServer) {
            config.plugins = [...config.plugins,
                new webpack.IgnorePlugin({
                    resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
                }),
            ]
        }
        return config
    },
};

export default nextConfig;


module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.equipmentworld.com',
                port: '',
                pathname: '/**',
            }
        ],
    }
}
