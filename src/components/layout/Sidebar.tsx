'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar';
import { useAuthStore } from '@/store/authStore';

const MenuList = [
    { href: '/', label: '홈' },
    { href: '/adopt', label: '입양 홍보' },
    { href: '/missing', label: '실종/목격 정보' },
    { href: '/map', label: '지도' },
    { href: '/chat', label: '채팅' },
    { href: '/mypage', label: '마이페이지' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isOpen, closeSidebar } = useSidebarStore();
    const { isAuthenticated, logout } = useAuthStore();
    const sidebarRef = React.useRef<HTMLElement | null>(null); // 닫힐 때 사이드바 내부 포커스를 제어하기 위해 ref를 추가했습니다.

    React.useEffect(() => {
        if (!isOpen && sidebarRef.current?.contains(document.activeElement)) {
            (document.activeElement as HTMLElement)?.blur(); // aria-hidden 경고를 피하기 위해 닫힐 때 내부 포커스를 해제하도록 추가했습니다.
        }
    }, [isOpen]);

    const handleAuthClick = () => {
        closeSidebar();

        if (isAuthenticated) {
            logout();
            router.push('/login');
            return;
        }

        router.push('/login');
    };

    return (
        <>
            <button
                type="button"
                aria-label="사이드바 닫기"
                onClick={closeSidebar}
                className={`fixed inset-0 z-60 bg-black/40 transition-opacity duration-300 ${
                    isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            />

            <aside
                ref={sidebarRef} // 닫힘 시 현재 포커스가 사이드바 내부인지 판단하려고 ref를 연결했습니다.
                className={`fixed top-0 right-0 z-70 h-screen w-[78vw] max-w-85 min-w-65 bg-white shadow-2xl transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                inert={!isOpen} // aria-hidden 대신 inert를 사용해 닫힌 상태에서 포커스/상호작용을 막도록 변경했습니다.
            >
                <div className="flex h-full flex-col">
                    <div className="border-b border-gray-200 px-5 py-4">
                        <p className="text-lg font-semibold text-gray-900">메뉴</p>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-3 py-3">
                        <ul className="space-y-1">
                            {MenuList.map((menu) => {
                                const isActive =
                                    pathname === menu.href || pathname?.startsWith(`${menu.href}/`);

                                return (
                                    <li key={menu.href}>
                                        <Link
                                            href={menu.href}
                                            onClick={closeSidebar}
                                            className={`block rounded-lg px-3 py-3 text-sm transition-colors ${
                                                isActive
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {menu.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <button
                        type="button"
                        onClick={handleAuthClick}
                        className={`w-full border-t border-gray-200 px-5 py-4 text-left text-lg font-semibold ${
                            isAuthenticated ? 'text-destructive' : 'text-gray-900'
                        }`}
                    >
                        {isAuthenticated ? '로그아웃' : '로그인'}
                    </button>
                </div>
            </aside>
        </>
    );
}
