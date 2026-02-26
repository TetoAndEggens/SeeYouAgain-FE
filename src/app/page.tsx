'use client';

import { fetchAdoptAnimals } from '@/api/animal';
import { fetchBoardList } from '@/api/board';
import { AdoptCard } from '@/components/features/adopt/AdoptCard';
import { AdoptCardSkeleton } from '@/components/features/adopt/AdoptCardSkeleton';
import { MissingSmallCard } from '@/components/features/missing/MissingSmallCard';
import { MissingSmallCardSkeleton } from '@/components/features/missing/MissingSmallCardSkeleton';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

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

    const renderAdoptList = () => {
        if (adoptLoading) {
            return Array.from({ length: 3 }).map((_, i) => (
                <AdoptCardSkeleton key={i} className="w-48 shrink-0" />
            ));
        }

        if (!adoptData?.length) {
            return (
                <div className="flex w-full flex-col items-center justify-center py-12 text-gray-400">
                    <p className="mt-4 text-lg">아직 등록된 친구가 없어요</p>
                </div>
            );
        }

        return adoptData.map((data) => (
            <Link key={data.animalId} href={`adopt/${data.animalId}`}>
                <AdoptCard className="w-48 shrink-0" {...data} />
            </Link>
        ));
    };

    const renderMissingList = () => {
        if (boardLoading) {
            return Array.from({ length: 3 }).map((_, i) => <MissingSmallCardSkeleton key={i} />);
        }

        if (!boardData?.length) {
            return (
                <div className="flex w-full flex-col items-center justify-center py-12 text-gray-400">
                    <p className="mt-4 text-lg">새로운 게시글이 없어요</p>
                </div>
            );
        }

        return boardData.map((data) => (
            <Link key={data.boardId} href={`missing/detail/${data.boardId}`}>
                <MissingSmallCard key={data.boardId} {...data} />
            </Link>
        ));
    };

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
                <div className="-mx-4 flex gap-4 overflow-x-auto px-4">{renderAdoptList()}</div>
            </div>
            <div className="bg-gray-10 flex flex-col gap-4 p-4">
                <Link href={'missing'}>
                    <div className="flex justify-between text-gray-50">
                        <span className="text-[1.25rem] font-bold">실종/목격 정보</span>
                        <ChevronRight />
                    </div>
                </Link>
                <div className="flex flex-col gap-4">{renderMissingList()}</div>
            </div>
        </div>
    );
}
