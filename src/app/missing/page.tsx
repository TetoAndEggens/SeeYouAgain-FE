'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';
import { useQuery } from '@tanstack/react-query';
import { fetchBoardList } from '@/api/board';
import { AnimalTypeType, SortByType } from '@/types/common';
import { CustomSelect } from '@/components/features/adopt/CustomSelect';
import NotFound from '@/components/layout/404';
import { MissingLargeCardSkeleton } from '@/components/features/missing/MissingLargeCardSkeleton';

export default function MissingPage() {
    const [sortBy, setSortBy] = useState<SortByType>('LATEST');
    const [animalType, setAnimalType] = useState<AnimalTypeType>('default');

    const { data: boardData, isLoading } = useQuery({
        queryKey: ['boardList', sortBy, animalType],
        queryFn: () =>
            fetchBoardList({
                size: 10,
                sortDirection: sortBy,
                type: animalType === 'default' ? null : animalType,
            }),
        select: (data) => data.data.board.data,
    });

    if (!boardData) return <NotFound />;

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-2 px-4 pt-4 sm:flex-row">
                <div className="flex justify-start gap-1">
                    총 <p className="text-[#FFB84D]">{boardData.length}건</p>의 게시글
                </div>
                <div className="flexjustify-end">
                    <div className="flex gap-2">
                        <CustomSelect
                            options={[
                                { value: 'default', label: '전체' },
                                { value: 'MISSING', label: '실종' },
                                { value: 'WITNESS', label: '목격' },
                            ]}
                            value={animalType}
                            onChange={setAnimalType}
                        />
                        <CustomSelect
                            options={[
                                { value: 'LATEST', label: '최신순' },
                                { value: 'OLDEST', label: '오래된순' },
                            ]}
                            value={sortBy}
                            onChange={setSortBy}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-gray-10 flex-1 p-4">
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {[...Array(5)].map((_, i) => (
                            <MissingLargeCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    boardData &&
                    boardData.map((data) => (
                        <Link
                            key={`missing-${data.boardId}`}
                            href={`missing/detail/${data.boardId}`}
                        >
                            <MissingLargeCard {...data} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
