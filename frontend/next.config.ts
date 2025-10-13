import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    webpack(config) {
        config.devtool = 'source-map';
        return config;
    },
};

export default nextConfig;
