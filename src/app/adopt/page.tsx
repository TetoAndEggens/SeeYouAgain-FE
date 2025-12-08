'use client';

import { AdoptCard } from '@/components/features/adopt/AdoptCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAdoptAnimals } from '@/api/adopt';
import { useInView } from 'react-intersection-observer';
import { AdoptAnimal, AdoptAnimalsResponse } from '@/types/adopt';

const AdoptPage = () => {
    const [sortBy, setSortBy] = useState<'LATEST' | 'OLDEST'>('LATEST');
    const {
        data: adoptData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery<
        AdoptAnimalsResponse, // TQueryFnData: queryFn 반환 타입
        Error, // TError: 에러 타입
        { animals: AdoptAnimal[]; totalCount: number }, // TData: select 반환 타입
        string[], // TQueryKey: queryKey 타입
        number | null // TPageParam: pageParam 타입
    >({
        queryKey: ['adoptAnimals', sortBy],
        queryFn: ({ pageParam = null }) =>
            fetchAdoptAnimals({
                cursorId: pageParam,
                size: 20,
                sortDirection: sortBy,
            }),
        getNextPageParam: (lastPage) => {
            return lastPage.data.animal.hasNext ? lastPage.data.animal.nextCursor : undefined;
        },
        select: (data) => ({
            animals: data.pages.flatMap((page) => page.data.animal.data),
            totalCount: data.pages[0]?.data.animalCount ?? 0,
        }),
        initialPageParam: null,
    });
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (isLoading) return <div>로딩중</div>;
    if (!adoptData) return <div>404</div>;

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="px-2 py-1 text-[0.75rem]">
                                {sortBy === 'LATEST' ? '최신순' : '오래된 순'}
                                <ChevronDown strokeWidth={1} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setSortBy('LATEST')}>
                                    최신순
                                    {sortBy === 'LATEST' && <Check className="text-accent" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('OLDEST')}>
                                    오래된순
                                    {sortBy === 'OLDEST' && <Check className="text-accent" />}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
            </div>
        </div>
    );
};

export default AdoptPage;
