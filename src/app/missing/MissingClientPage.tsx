'use client';

import React from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/layout/Selector';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';

interface MissingClientPageProps {
    data?: {
        cardType: 'missing' | 'sighting';
        name: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    }[];
}

const MissingClientPage = ({ data }: MissingClientPageProps) => {
    return (
        <div className="flex w-full flex-col gap-4 p-5">
            <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
                <div className="flex w-full justify-start gap-1">
                    총 <p className="text-[#FFB84D]">{data?.length}건</p>의 게시글
                </div>
                <div className="flex w-full justify-end">
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
            <div className="">
                {data?.map((item, index) => (
                    <Link key={`missing-${index}`} href={`missing/detail/${index}`}>
                        <MissingLargeCard {...item} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MissingClientPage;
