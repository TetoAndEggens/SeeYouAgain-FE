'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Bell, Menu, ChevronLeft, X } from 'lucide-react';

type Variant = 'default' | 'back' | 'backOnly' | 'close' | 'hidden';

interface Action {
    key: string;
    ariaLabel: string;
    onClick: () => void;
    icon: React.ReactNode;
}

const ROUTE_RULES: Record<string, { variant: Variant; title?: string }> = {
    '/': { variant: 'default', title: 'SeeYouAgain' },
    '/login': { variant: 'hidden' },
    '/signup': { variant: 'close', title: '회원가입' },
    '/map': { variant: 'default', title: '다시 만날 U' },
    '/adopt/': { variant: 'backOnly', title: '' },
    '/adopt': { variant: 'default', title: '입양 동물 찾기' },
    '/missing/report': { variant: 'close', title: '글쓰기' },
    '/missing/detail/': { variant: 'back', title: '실종 동물 찾기' },
    '/missing': { variant: 'default', title: '실종 동물 찾기' },
    '/chat/detail/': { variant: 'hidden' },
    '/chat': { variant: 'default', title: '채팅' },
    '/test': { variant: 'back', title: 'Test Page' },
    '/sample': { variant: 'hidden' },
    '/mypage/settings': { variant: 'back', title: '알림 설정' },
    '/mypage/posts': { variant: 'back', title: '내가 쓴 글' },
    '/mypage': { variant: 'default', title: '마이페이지' },
    '/report': { variant: 'close', title: '신고하기' },
};

function HeaderControl(pathname: string | null) {
    const currentPath = pathname || '/';

    const matcheUrl = Object.entries(ROUTE_RULES)
        .filter(([pattern]) => {
            if (currentPath === pattern) return true;
            if (pattern.endsWith('/')) return currentPath.startsWith(pattern);
            if (currentPath.startsWith(pattern + '/')) return true;
            return false;
        })
        .sort((a, b) => b[0].length - a[0].length)[0];

    if (!matcheUrl) {
        return { variant: 'default' as Variant, title: 'SeeYouAgain' };
    }

    const [, rule] = matcheUrl;
    return {
        variant: rule.variant,
        title: rule.title ?? 'SeeYouAgain',
    };
}

export function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const headerControl = React.useMemo(() => HeaderControl(pathname), [pathname]);

    if (headerControl.variant === 'hidden') return null;

    const variant = headerControl.variant as Variant;

    const iconConfig: Record<Variant, { leftIcons: Action[]; rightIcons: Action[] }> = {
        default: {
            leftIcons: [],
            rightIcons: [
                {
                    key: 'bell',
                    ariaLabel: '알림',
                    onClick: () => console.log('알림 클릭'),
                    icon: <Bell size={24} />,
                },
                {
                    key: 'menu',
                    ariaLabel: '메뉴',
                    onClick: () => console.log('메뉴 클릭'),
                    icon: <Menu size={24} />,
                },
            ],
        },
        back: {
            leftIcons: [
                {
                    key: 'back',
                    ariaLabel: '뒤로가기',
                    onClick: () => router.back(),
                    icon: <ChevronLeft size={24} />,
                },
            ],
            rightIcons: [
                {
                    key: 'bell',
                    ariaLabel: '알림',
                    onClick: () => console.log('알림 클릭'),
                    icon: <Bell size={24} />,
                },
                {
                    key: 'menu',
                    ariaLabel: '메뉴',
                    onClick: () => console.log('메뉴 클릭'),
                    icon: <Menu size={24} />,
                },
            ],
        },
        backOnly: {
            leftIcons: [
                {
                    key: 'back',
                    ariaLabel: '뒤로가기',
                    onClick: () => router.back(),
                    icon: <ChevronLeft size={24} />,
                },
            ],
            rightIcons: [],
        },
        close: {
            leftIcons: [
                {
                    key: 'close',
                    ariaLabel: '닫기',
                    onClick: () => window.history.back(),
                    icon: <X size={24} />,
                },
            ],
            rightIcons: [],
        },
        hidden: {
            leftIcons: [],
            rightIcons: [],
        },
    };

    const { leftIcons, rightIcons } = iconConfig[variant];

    return (
        <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-600 bg-[#F8F9FA] p-4">
            <div className="flex items-center justify-between gap-2 bg-auto">
                {leftIcons.map((item) => (
                    <button
                        key={item.key}
                        aria-label={item.ariaLabel}
                        onClick={item.onClick}
                        className="cursor-pointer"
                    >
                        {item.icon}
                    </button>
                ))}
                <button onClick={() => router.push('/')} className="cursor-pointer">
                    <p className="text-lg font-bold">{headerControl.title}</p>
                </button>
            </div>
            <div className="flex w-24 items-center justify-between bg-auto p-2 pt-0 pb-0">
                {rightIcons.map((item) => (
                    <button
                        key={item.key}
                        aria-label={item.ariaLabel}
                        onClick={item.onClick}
                        className="cursor-pointer"
                    >
                        {item.icon}
                    </button>
                ))}
            </div>
        </header>
    );
}
