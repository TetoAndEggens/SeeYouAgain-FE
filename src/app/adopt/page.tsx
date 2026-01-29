'use client';

import { AdoptCard } from '@/components/features/adopt/AdoptCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CustomSelect } from '@/components/features/adopt/CustomSelect';
import { useAdoptAnimals } from '@/hook/adopt/useAdoptAnimals';
import { SortByType } from '@/types/common';
import { useInfiniteScroll } from '@/hook/adopt/useInfiniteScroll';
import NotFound from '@/components/layout/404';

const AdoptPage = () => {
    const [sortBy, setSortBy] = useState<SortByType>('LATEST');

    const {
        data: adoptData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useAdoptAnimals(sortBy);
    const { ref } = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    if (isLoading) return <div>로딩중</div>;
    if (!adoptData) return <NotFound />;

    return (
        <div className="mt-3 flex flex-col gap-8 px-4 py-4">
            <div className="flex justify-between">
                <span className="text-[1rem] text-gray-50">
                    총<span className="text-primary">{adoptData.totalCount}마리</span>가 기다리고
                    있어요
                </span>
                <div className="flex gap-2">
                    <Button variant="outline" className="px-4 py-1 text-[0.75rem]">
                        필터
                    </Button>
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
            <div className="bg-gray-10 m-[-1rem] grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-5">
                {adoptData.animals?.map((data) => (
                    <Link key={data.animalId} href={`adopt/${data.animalId}`}>
                        <AdoptCard {...data} />
                    </Link>
                ))}
                {hasNextPage && (
                    <div ref={ref} className="col-span-full flex items-center justify-center py-8">
                        {isFetchingNextPage ? (
                            <div className="flex items-center gap-2 text-gray-50">
                                <span>로딩 중...</span>
                            </div>
                        ) : (
                            <div className="h-10" />
                        )}
                    </div>
                )}
                {!adoptData && (
                    <div className="flex h-full w-full flex-col items-center justify-center py-12 text-gray-400">
                        <p className="mt-4 text-lg">새로운 게시글이 없어요</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdoptPage;
