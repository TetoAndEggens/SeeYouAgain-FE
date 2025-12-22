'use client';

import React from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/layout/Selector';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';
import { useQuery } from '@tanstack/react-query';
import { fetchBoardList } from '@/api/board';

export default function MissingPage() {
    const { data: boardData, isLoading } = useQuery({
        queryKey: ['boardList'],
        queryFn: () =>
            fetchBoardList({
                size: 10,
                sortDirection: 'LATEST',
            }),
        select: (data) => data.data.board.data,
    });

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-2 px-4 pt-4 sm:flex-row">
                <div className="flex justify-start gap-1">
                    총 <p className="text-[#FFB84D]">{boardData?.length}건</p>의 게시글
                </div>
                <div className="flexjustify-end">
                    <div className="flex gap-2">
                        <CustomSelect
                            options={[
                                {
                                    items: [
                                        {
                                            value: '실종',
                                            name: '실종',
                                        },
                                        {
                                            value: '목격',
                                            name: '목격',
                                        },
                                    ],
                                },
                            ]}
                            placeholder="실종"
                            defaultValue="실종"
                        />
                        <CustomSelect
                            options={[
                                {
                                    items: [
                                        {
                                            value: '최신순',
                                            name: '최신순',
                                        },
                                        {
                                            value: '오래된 순',
                                            name: '오래된 순',
                                        },
                                    ],
                                },
                            ]}
                            placeholder="최신순"
                            defaultValue="최신순"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-gray-10 flex-1 p-4">
                {boardData &&
                    boardData?.map((data) => (
                        <Link
                            key={`missing-${data.boardId}`}
                            href={`missing/detail/${data.boardId}`}
                        >
                            <MissingLargeCard {...data} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
