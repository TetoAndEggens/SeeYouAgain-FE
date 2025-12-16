'use client';

import React from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/layout/Selector';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';

interface MissingProps {
    data?: {
        cardType: 'missing' | 'sighting';
        name: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    }[];
}

export default function MissingPage() {
    const testData: {
        cardType: 'missing' | 'sighting';
        name: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    }[] = [
        {
            cardType: 'missing',
            name: '복돌이',
            tags: ['말티즈', '3살', '중성화', '암컷'],
            location: '서울 강남구 역삼동',
            date: '2025-11-01',
            image: 'https://placedog.net/500/280',
        },
        {
            cardType: 'missing',
            name: '초코',
            tags: ['푸들', '2살', '갈색', '암컷'],
            location: '서울 마포구 합정동',
            date: '2025-10-28',
            image: 'https://placedog.net/501/281',
        },
        {
            cardType: 'sighting',
            name: '하루',
            tags: ['믹스', '목걸이 없음', '겁이 많음'],
            location: '서울 송파구 잠실동',
            date: '2025-11-02',
            image: 'https://placedog.net/502/282',
        },
        {
            cardType: 'missing',
            name: '몽이',
            tags: ['시바견', '4살', '수컷', '하네스 착용'],
            location: '경기 성남시 분당구',
            date: '2025-10-20',
            image: 'https://placedog.net/503/283',
        },
        {
            cardType: 'sighting',
            name: '두부',
            tags: ['하얀털', '귀가 큰 편', '사람을 잘 따름'],
            location: '서울 용산구 이태원동',
            date: '2025-11-03',
            image: 'https://placedog.net/504/284',
        },
        {
            cardType: 'missing',
            name: '보리',
            tags: ['코기', '5살', '수컷', '꼬리 짧음'],
            location: '인천 연수구 송도동',
            date: '2025-09-30',
            image: 'https://placedog.net/505/285',
        },
        {
            cardType: 'sighting',
            name: '라라',
            tags: ['검은색 목줄', '소형견', '낯가림 있음'],
            location: '서울 강서구 마곡동',
            date: '2025-11-05',
            image: 'https://placedog.net/506/286',
        },
        {
            cardType: 'missing',
            name: '콩이',
            tags: ['치와와', '1살', '암컷', '장난감 좋아함'],
            location: '경기 고양시 일산동구',
            date: '2025-10-10',
            image: 'https://placedog.net/507/287',
        },
        {
            cardType: 'sighting',
            name: '탄이',
            tags: ['블랙탄', '중형견', '목에 파란 목줄'],
            location: '서울 동작구 상도동',
            date: '2025-11-04',
            image: 'https://placedog.net/508/288',
        },
        {
            cardType: 'missing',
            name: '미미',
            tags: ['말티즈', '7살', '치아 안 좋음', '중성화'],
            location: '부산 해운대구',
            date: '2025-09-15',
            image: 'https://placedog.net/509/289',
        },
    ];

    return (
        <div className="flex w-full flex-col gap-4 p-5">
            <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
                <div className="flex w-full justify-start gap-1">
                    총 <p className="text-[#FFB84D]">{testData?.length}건</p>의 게시글
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
                {testData?.map((item, index) => (
                    <Link key={`missing-${index}`} href={`missing/detail/${index}`}>
                        <MissingLargeCard {...item} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
