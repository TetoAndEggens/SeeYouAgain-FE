'use client';

import { fetchAdoptAnimals } from '@/api/animal';
import { fetchBoardList } from '@/api/board';
import { AdoptCard } from '@/components/features/adopt/AdoptCard';
import { MissingSmallCard } from '@/components/features/missing/MissingSmallCard';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const { data: adoptData, isLoading: adoptLoading } = useQuery({
        queryKey: ['adoptAnimals'],
        queryFn: () =>
            fetchAdoptAnimals({
                size: 10,
                sortDirection: 'LATEST',
            }),
        select: (data) => data.data.animal.data,
    });

    const { data: boardData, isLoading: boardLoading } = useQuery({
        queryKey: ['boardList'],
        queryFn: () =>
            fetchBoardList({
                size: 5,
                sortDirection: 'LATEST',
            }),
        select: (data) => data.data.board.data,
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-primary text-gray-10 flex h-32 flex-col justify-center gap-2 px-8">
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
                            <Link key={data.animalId} href={`adopt/${data.animalId}`}>
                                <AdoptCard className="w-48" {...data} />
                            </Link>
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
                    {boardData &&
                        boardData.map((data) => (
                            <Link href={`missing/detail/${data.boardId}`}>
                                <MissingSmallCard key={data.boardId} {...data} />
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}
