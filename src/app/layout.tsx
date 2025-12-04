import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { cn } from '@/lib/utils';
import { Header } from '../components/layout/Header';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import QueryProvider from '@/providers/QueryProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';

const pretendard = localFont({
    src: [
        {
            path: '../fonts/Pretendard-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/Pretendard-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/Pretendard-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../fonts/Pretendard-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-pretendard',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'SeeYouAgain',
    description: '프로젝트 설명',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'SeeYouAgain',
    },
    icons: {
        icon: '/icon-192x192.png',
        apple: '/icon-192x192.png',
    },
};

export const viewport: Viewport = {
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={pretendard.variable}>
            <body className={`${pretendard.className} flex h-screen flex-col`}>
                {/* 로그인 상태 인증을 위한 provider */}
                <AuthProvider>
                    <Header />
                    <QueryProvider>
                        <main className="relative h-full overflow-y-auto">{children}</main>
                    </QueryProvider>
                    <NavigationMenu />
                </AuthProvider>
            </body>
        </html>
    );
}
