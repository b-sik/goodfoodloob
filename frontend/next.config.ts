import type { NextConfig } from 'next';

const isServerBuild = process.env.SKIP_NEXT_CHECKS === 'true';

const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    webpack(config) {
        if (!isServerBuild) {
            config.devtool = 'source-map';
            return config;
        } else {
            return config;
        }
    },
    typescript: {
        ignoreBuildErrors: isServerBuild,
    },
};

export default nextConfig;
