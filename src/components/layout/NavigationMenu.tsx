'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { House, HeartHandshake, Search, Map, CircleUser } from 'lucide-react';

const exceptUrls = [
    '/login',
    '/signup',
    '/test',
    '/missing/detail',
    '/missing/report',
    '/chat/detail',
    '/report',
]; // 예외 URL 목록

function isExceptUrl(pathname: string) {
    return exceptUrls.some((url) => {
        if (pathname === url) return true;
        if (pathname.startsWith(url + '/')) return true;
        return false;
    });
}

export function NavigationMenu() {
    const pathname = usePathname();

    if (isExceptUrl(pathname)) return null;

    return (
        //페이지가 Header와 Navigation사이의 공간만 차지하도록 하기 위해 fixed 제거
        <div className="right-0 bottom-0 left-0 z-40 w-full">
            <nav className="w-full border-gray-300 bg-gray-100 px-4 py-2">
                <ul className="flex w-full justify-around">
                    <li>
                        <Link
                            href="/"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '/' || pathname === null ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <House
                                strokeWidth={1}
                                color={pathname === '/' || pathname === null ? '#FFB84D' : 'black'}
                            />
                            홈
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/adopt"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <HeartHandshake
                                strokeWidth={1}
                                color={pathname === '/adopt' ? '#FFB84D' : 'black'}
                            />
                            입양
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/missing"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '/missing' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <Search
                                strokeWidth={1}
                                color={pathname === '/missing' ? '#FFB84D' : 'black'}
                            />
                            실종
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/map"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <Map
                                strokeWidth={1}
                                color={pathname === '/map' ? '#FFB84D' : 'black'}
                            />
                            지도
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/mypage"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname.startsWith('/mypage') ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <CircleUser
                                strokeWidth={1}
                                color={pathname.startsWith('/mypage') ? '#FFB84D' : 'black'}
                            />
                            마이
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
