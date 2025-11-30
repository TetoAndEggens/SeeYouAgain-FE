'use client';

import { AdoptLargeCard } from '@/components/features/adopt/AdoptLargeCard';
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
import { useState } from 'react';
import SearchInput from '@/components/ui/searchInput';
import { useQuery } from '@tanstack/react-query';
import { fetchAdoptAnimals } from '@/api/adopt';

const AdoptPage = () => {
    const [sortBy, setSortBy] = useState('newest');
    const { data, isLoading } = useQuery({
        queryKey: ['adoptAnimals'],
        queryFn: fetchAdoptAnimals,
    });

    return (
        <div className="mt-3 flex flex-col gap-8 px-4 py-4">
            {/* <div>
                <SearchInput placeholder="품종, 지역으로 검색" />
            </div> */}
            <div className="flex justify-between">
                <span className="text-[1rem] text-gray-50">
                    총 <span className="text-primary">{data ? data.length : 0}마리</span>가 기다리고
                    있어요
                </span>
                <div className="flex gap-2">
                    <Button variant="outline" className="px-4 py-1 text-[0.75rem]">
                        필터
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="px-2 py-1 text-[0.75rem]">
                                {sortBy === 'newest' ? '최신순' : '오래된 순'}
                                <ChevronDown strokeWidth={1} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    최신순
                                    {sortBy === 'newest' && <Check className="text-accent" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    오래된순
                                    {sortBy === 'oldest' && <Check className="text-accent" />}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="bg-gray-10 m-[-1rem] grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {data &&
                    data.map((data, idx) => (
                        <Link key={`adopt-${idx}`} href={`adopt/${idx}`}>
                            <AdoptLargeCard {...data} />
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default AdoptPage;
