'use client';

import { fetchAdoptAnimals } from '@/api/adopt';
import { AdoptCard } from '@/components/features/adopt/AdoptCard';
import { MissingSmallCard } from '@/components/features/missing/MissingSmallCard';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const testMissingSmallData = [
    {
        cardType: 'missing' as const,
        name: '복돌이',
        tags: ['암컷', '3kg', '파란 목줄'],
        location: '서울 강남구',
        date: '2시간 전',
        image: 'https://placedog.net/500/280',
    },
    {
        cardType: 'missing' as const,
        name: '복돌이',
        tags: ['암컷', '3kg', '파란 목줄'],
        location: '서울 강남구',
        date: '2시간 전',
        image: 'https://placedog.net/500/280',
    },
    {
        cardType: 'sighting' as const,
        name: '복돌이',
        tags: ['암컷', '3kg', '파란 목줄'],
        location: '서울 강남구',
        date: '2시간 전',
        image: 'https://placedog.net/500/280',
    },
    {
        cardType: 'missing' as const,
        name: '복돌이',
        tags: ['암컷', '3kg', '파란 목줄'],
        location: '서울 강남구',
        date: '2시간 전',
        image: 'https://placedog.net/500/280',
    },
    {
        cardType: 'missing' as const,
        name: '복돌이',
        tags: ['암컷', '3kg', '파란 목줄'],
        location: '서울 강남구',
        date: '2시간 전',
        image: 'https://placedog.net/500/280',
    },
];

export default function Home() {
    const { data: adoptData, isLoading } = useQuery({
        queryKey: ['adoptAnimals'],
        queryFn: fetchAdoptAnimals,
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-primary text-gray-10 flex h-[8rem] flex-col justify-center gap-2 px-8">
                <p className="text-[1.25rem] font-bold">새로운 가족을 만나보세요</p>
                <p>오늘도 많은 아이들이 당신을 기다리고 있어요</p>
            </div>
            <div className="bg-gray-10 flex flex-col gap-4 p-4">
                <Link href={'adopt'}>
                    <div className="flex justify-between text-gray-50">
                        <span className="text-[1.25rem] font-bold">새로 등록된 친구들</span>
                        <ChevronRight />
                    </div>
                </Link>
                <div className="-mx-4 flex gap-4 overflow-x-auto">
                    <div></div>
                    {adoptData &&
                        adoptData.map((data) => (
                            <AdoptCard key={data.animalId} className="w-48" {...data} />
                        ))}
                    <div></div>
                </div>
            </div>
            <div className="bg-gray-10 flex flex-col gap-4 p-4">
                <Link href={'missing'}>
                    <div className="flex justify-between text-gray-50">
                        <span className="text-[1.25rem] font-bold">실종/목격 정보</span>
                        <ChevronRight />
                    </div>
                </Link>
                <div className="flex flex-col gap-4">
                    {testMissingSmallData.slice(0, 3).map((data, idx) => (
                        <MissingSmallCard key={idx} {...data} />
                    ))}
                </div>
            </div>
        </div>
    );
}
