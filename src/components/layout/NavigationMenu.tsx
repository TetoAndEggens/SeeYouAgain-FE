'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { House, HeartHandshake, Search, Map, CircleUser } from 'lucide-react';

export function NavigationMenu() {
    const pathname = usePathname();
    console.log('pahtname : ', pathname);

    // if (pathname === '/test') return null;

    return (
        <div className="sticky bottom-0 z-50 w-full">
            <nav className="w-full border-gray-300 bg-gray-100 px-4 py-2">
                <ul className="flex w-full justify-around">
                    <li>
                        <a
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
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <HeartHandshake
                                strokeWidth={1}
                                color={pathname === '' ? '#FFB84D' : 'black'}
                            />
                            입양
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <Search strokeWidth={1} color={pathname === '' ? '#FFB84D' : 'black'} />
                            실종
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <Map strokeWidth={1} color={pathname === '' ? '#FFB84D' : 'black'} />
                            지도
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={cn(
                                'flex flex-1 flex-col items-center px-2 py-1 text-gray-700 hover:font-bold hover:text-gray-900',
                                pathname === '' ? 'text-[#FFB84D]' : ''
                            )}
                        >
                            <CircleUser
                                strokeWidth={1}
                                color={pathname === '' ? '#FFB84D' : 'black'}
                            />
                            마이
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
