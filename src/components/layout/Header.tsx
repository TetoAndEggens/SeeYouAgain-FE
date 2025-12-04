'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Bell, Menu, ChevronLeft, X } from 'lucide-react';

type Variant = 'default' | 'back' | 'close' | 'hidden';

interface Action {
    key: string;
    ariaLabel: string;
    onClick: () => void;
    icon: React.ReactNode;
}

const ROUTE_RULES: Record<string, { variant: Variant; title?: string }> = {
    '/': { variant: 'default', title: 'SeeYouAgain' },
    '/missing/detail': { variant: 'back', title: '실종 동물 찾기' },
    '/missing': { variant: 'default', title: '실종 동물 찾기' },
    '/chat/': { variant: 'default', title: '' },
    '/chat': { variant: 'default', title: '채팅' },
    '/test': { variant: 'back', title: 'Test Page' },
    '/sample': { variant: 'hidden' },
};

function HeaderControl(pathname: string | null) {
    const currentPath = pathname || '/';

    const matcheUrl = Object.entries(ROUTE_RULES).find(([pattern]) => {
        if (currentPath === pattern) return true;
        if (currentPath.startsWith(pattern + '/')) return true;
        return false;
    });

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
    console.log('Current Pathname:', pathname);

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
            <div className="flex items-center justify-between bg-auto">
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
