'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Avatar } from '@/components/layout/Avatar';
import Tag from '@/components/ui/tag';
import { Form } from '@/components/layout/Form';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Pencil } from 'lucide-react';

const PostDetail = () => {
    const router = useRouter();
    const param = useParams();
    const id = Number(param.id);

    const testData: {
        cardType: 'missing' | 'sighting';
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
            cardType: 'sighting',
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
            cardType: 'sighting',
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
            cardType: 'sighting',
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
            cardType: 'sighting',
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
        <div className="flex flex-col gap-4 p-4">
            <div className="shrink-0">
                <div className="aspect-square w-full overflow-hidden">
                    <img
                        src={testData[id].image}
                        alt={testData[id].title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-4">
                    <Avatar />
                    <div>
                        <h1 className="">{testData[id].userName}</h1>
                        <p className="">{testData[id].date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-2">
                    <Pencil color="gray" />
                    <p className="text-gray-40">수정</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 pb-0">
                <Tag variant={testData[id].cardType} size="sm" className="w-fit">
                    {testData[id].cardType === 'missing' ? '실종' : '목격'}
                </Tag>
                <Form
                    className="border-0 p-0"
                    title={testData[id].title}
                    children={
                        <p className="">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia illum
                            fugiat unde voluptatum natus excepturi fugit corporis tenetur nisi qui?
                            Delectus distinctio sint ut? Consectetur eius earum quis porro odit!
                        </p>
                    }
                    tagChildren={
                        <div className="flex gap-2">
                            {testData[id].tags.map((tag) => (
                                <Tag key={tag} variant="default" size="sm">
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    }
                />
            </div>
            <Form
                className="border-0 p-0"
                title="상세 정보"
                children={
                    <div className="flex flex-col gap-2">
                        <div>
                            <InformationDetail item={{ title: '품종', context: '말티즈' }} />
                        </div>
                        <div className="flex gap-2">
                            <InformationDetail item={{ title: '성별', context: '수컷' }} />
                            <InformationDetail item={{ title: '색상', context: '노랑' }} />
                        </div>
                    </div>
                }
            />
            <Form
                className="gap-2 border-0 p-0"
                title="목격 위치"
                children={
                    <div className="flex flex-col gap-2">
                        <div className="h-50 w-full rounded-lg bg-gray-500">지도</div>
                        <div className="">{testData[id].location}</div>
                    </div>
                }
            />
        </div>
    );
};

export default PostDetail;
