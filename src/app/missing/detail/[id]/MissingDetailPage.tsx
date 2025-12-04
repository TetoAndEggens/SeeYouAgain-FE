'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/layout/Avatar';
import Tag from '@/components/ui/tag';
import { Form } from '@/components/layout/Form';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Button } from '@/components/ui/button';
import { Siren } from 'lucide-react';
import { MissingDetailData } from '@/types/map';

export default function MissingDetailPage({ data }: MissingDetailData) {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex-shrink-0">
                <div className="aspect-square w-full overflow-hidden">
                    <img src={data.image} alt={data.title} className="h-full w-full object-cover" />
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-4">
                    <Avatar />
                    <div>
                        <h1 className="">{data.userName}</h1>
                        <p className="">{data.date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-2">
                    <Siren color="#fe4444" />
                    <p className="text-[#fe4444]">신고</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 pb-0">
                <Tag variant={data.cardType} size="sm" className="w-fit">
                    {data.cardType === 'missing' ? '실종' : '목격'}
                </Tag>
                <Form
                    className="border-0 p-0"
                    title={data.title}
                    children={
                        <p className="">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia illum
                            fugiat unde voluptatum natus excepturi fugit corporis tenetur nisi qui?
                            Delectus distinctio sint ut? Consectetur eius earum quis porro odit!
                        </p>
                    }
                    tagChildren={
                        <div className="flex gap-2">
                            {data.tags.map((tag) => (
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
                        <div className="h-[200px] w-full rounded-lg bg-gray-500">지도</div>
                        <div className="">{data.location}</div>
                    </div>
                }
            />

            <Button className="w-full" onClick={() => router.push('/chat')}>
                채팅하기
            </Button>
        </div>
    );
}
