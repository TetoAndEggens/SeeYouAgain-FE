'use client';

import React from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/layout/Selector';
import Filter from '@/components/layout/Filter';

interface MissingClientPageProps {
    data?: {
        count: number;
        items: {
            title: string;
            position: string;
            location: string;
            time: string;
            tags: string[];
        }[];
    };
}

const MissingClientPage = ({ data }: MissingClientPageProps) => {
    const [filterOpen, setFilterOpen] = React.useState(false);

    return (
        <div>
            <Filter open={filterOpen} isOpen={setFilterOpen} />

            <div className="flex w-full items-center justify-between p-5">
                <div className="flex w-fit items-center gap-1">
                    총 <p className="text-[#FFB84D]">{data?.count}건</p>의 게시글
                </div>
                <div className="flex w-fit gap-4">
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
                    />
                    <CustomSelect placeholder="최신순" />
                </div>
            </div>
        </div>
    );
};

export default MissingClientPage;
