import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { cn } from '@/lib/utils';
import { Header } from '../components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import QueryProvider from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Toaster } from 'sonner'; // 전역 toast 렌더링을 위해 Toaster를 추가했습니다.

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
    description: '?꾨줈?앺듃 ?ㅻ챸',
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
                {/* 濡쒓렇???곹깭 ?몄쬆???꾪븳 provider */}
                <AuthProvider>
                    <Header />
                    <QueryProvider>
                        <main className="relative h-full overflow-y-auto">{children}</main>
                    </QueryProvider>
                    <NavigationMenu />
                    <Sidebar />
                    <Toaster richColors position="top-center" /> {/* 페이지 전환 시에도 toast가 보이도록 루트에 배치했습니다. */}
                </AuthProvider>
            </body>
        </html>
    );
}
