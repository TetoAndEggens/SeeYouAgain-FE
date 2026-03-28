import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

//PWA 테스트해야할 경우 disable 구문 제거
const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
});

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placedog.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placecats.com',
                pathname: '/**',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
            },
        ];
    },
};

export default withPWA(nextConfig);
