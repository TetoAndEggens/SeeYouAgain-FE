'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Avatar } from '@/components/layout/Avatar';
import Tag from '@/components/ui/tag';
import { Form } from '@/components/layout/Form';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Button } from '@/components/ui/button';
import { Siren } from 'lucide-react';
import Image from 'next/image';

const LostDetailPage = () => {
    const router = useRouter();
    const param = useParams();
    const id = Number(param.id);

    const testData: {
        cardType: 'missing' | 'witness';
        title: string;
        userName: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    }[] = [
        {
            cardType: 'missing',
            title: '복돌이',
            userName: '홍길동',
            tags: ['말티즈', '3살', '중성화', '암컷'],
            location: '서울 강남구 역삼동',
            date: '2025-11-01',
            image: 'https://placedog.net/500/280',
        },
        {
            cardType: 'missing',
            title: '초코',
            userName: '홍길동',
            tags: ['푸들', '2살', '갈색', '암컷'],
            location: '서울 마포구 합정동',
            date: '2025-10-28',
            image: 'https://placedog.net/501/281',
        },
        {
            cardType: 'witness',
            title: '하루',
            userName: '홍길동',
            tags: ['믹스', '목걸이 없음', '겁이 많음'],
            location: '서울 송파구 잠실동',
            date: '2025-11-02',
            image: 'https://placedog.net/502/282',
        },
        {
            cardType: 'missing',
            title: '몽이',
            userName: '홍길동',
            tags: ['시바견', '4살', '수컷', '하네스 착용'],
            location: '경기 성남시 분당구',
            date: '2025-10-20',
            image: 'https://placedog.net/503/283',
        },
        {
            cardType: 'witness',
            title: '두부',
            userName: '홍길동',
            tags: ['하얀털', '귀가 큰 편', '사람을 잘 따름'],
            location: '서울 용산구 이태원동',
            date: '2025-11-03',
            image: 'https://placedog.net/504/284',
        },
        {
            cardType: 'missing',
            title: '보리',
            userName: '홍길동',
            tags: ['코기', '5살', '수컷', '꼬리 짧음'],
            location: '인천 연수구 송도동',
            date: '2025-09-30',
            image: 'https://placedog.net/505/285',
        },
        {
            cardType: 'witness',
            title: '라라',
            userName: '홍길동',
            tags: ['검은색 목줄', '소형견', '낯가림 있음'],
            location: '서울 강서구 마곡동',
            date: '2025-11-05',
            image: 'https://placedog.net/506/286',
        },
        {
            cardType: 'missing',
            title: '콩이',
            userName: '홍길동',
            tags: ['치와와', '1살', '암컷', '장난감 좋아함'],
            location: '경기 고양시 일산동구',
            date: '2025-10-10',
            image: 'https://placedog.net/507/287',
        },
        {
            cardType: 'witness',
            title: '탄이',
            userName: '홍길동',
            tags: ['블랙탄', '중형견', '목에 파란 목줄'],
            location: '서울 동작구 상도동',
            date: '2025-11-04',
            image: 'https://placedog.net/508/288',
        },
        {
            cardType: 'missing',
            title: '미미',
            userName: '홍길동',
            tags: ['말티즈', '7살', '치아 안 좋음', '중성화'],
            location: '부산 해운대구',
            date: '2025-09-15',
            image: 'https://placedog.net/509/289',
        },
    ];

    return (
        <div className="flex flex-col">
            <div className="shrink-0">
                <div className="aspect-square w-full overflow-hidden">
                    <Image
                        width={360}
                        height={360}
                        priority
                        src={testData[id].image}
                        alt={testData[id].title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 bg-white p-4">
                <div className="flex items-center gap-4">
                    <Avatar />
                    <div>
                        <h1 className="font-semibold">{testData[id].userName}</h1>
                        <p className="text-gray-40 text-sm">{testData[id].date}</p>
                    </div>
                </div>
                <div className="bg-gray-10 flex items-center gap-1 rounded-lg border border-gray-300 p-2">
                    <Siren color="#fe4444" />
                    <p className="text-gray-40">신고</p>
                </div>
            </div>
            <div className="bg-gray-10 h-4"></div>
            <div className="flex flex-col gap-4 p-4">
                <Tag variant={testData[id].cardType} size="sm" className="w-fit">
                    {testData[id].cardType === 'missing' ? '실종' : '목격'}
                </Tag>
                <Form
                    className="border-0 p-0"
                    title={testData[id].title}
                    tagChildren={
                        <div className="flex gap-2">
                            {testData[id].tags.map((tag) => (
                                <Tag key={tag} variant="default" size="sm">
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    }
                >
                    <p className="">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia illum fugiat
                        unde voluptatum natus excepturi fugit corporis tenetur nisi qui? Delectus
                        distinctio sint ut? Consectetur eius earum quis porro odit!
                    </p>
                </Form>
            </div>
            <div className="bg-gray-10 h-4"></div>
            <Form
                className="border-0 p-4"
                title="상세 정보"
                children={
                    <div className="flex flex-col gap-4">
                        <div>
                            <InformationDetail item={{ title: '품종', context: '말티즈' }} />
                        </div>
                        <div className="flex gap-4">
                            <InformationDetail item={{ title: '성별', context: '수컷' }} />
                            <InformationDetail item={{ title: '색상', context: '노랑' }} />
                        </div>
                    </div>
                }
            />
            <div className="bg-gray-10 h-4"></div>
            <Form
                className="gap-4 border-0 p-4"
                title="목격 위치"
                children={
                    <div className="flex flex-col gap-4">
                        <div className="h-50 w-full rounded-lg bg-gray-500">지도</div>
                        <div className="bg-gray-10">{testData[id].location}</div>
                    </div>
                }
            />
            <div className="sticky bottom-0 p-4">
                <Button className="w-full" onClick={() => router.push('/chat')}>
                    채팅하기
                </Button>
            </div>
        </div>
    );
};

export default LostDetailPage;
