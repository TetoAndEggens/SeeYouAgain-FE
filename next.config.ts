import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

//PWA 테스트해야할 경우 disable 구문 제거
const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
});

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://dev-api.seeyouagain.store/:path*',
            },
        ];
    },
};

export default withPWA(nextConfig);
