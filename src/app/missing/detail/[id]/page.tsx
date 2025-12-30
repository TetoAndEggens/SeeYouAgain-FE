'use client';

import React, { use } from 'react';
import { Avatar } from '@/components/layout/Avatar';
import Tag from '@/components/ui/tag';
import { Form } from '@/components/layout/Form';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Button } from '@/components/ui/button';
import { Siren } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchBoardById } from '@/api/board';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '@/components/layout/ImageCarousel';
import { StaticMap } from '@/components/features/map/StaticMap';
import { formatRelativeTime } from '@/lib/utils';
import { formatSex } from '@/lib/format-utils';
import useKakaoLoader from '@/hook/map/useKakaoLoader';

interface MissingDetailPageProps {
    params: Promise<{ id: string }>;
}
const LostDetailPage = ({ params }: MissingDetailPageProps) => {
    const [loading, error] = useKakaoLoader();
    const router = useRouter();
    const { id } = use(params);
    const { data: missingDetail, isLoading } = useQuery({
        queryKey: ['boardListById', id],
        queryFn: () => fetchBoardById(Number(id)),
        select: (data) => data.data,
    });

    if (isLoading) return <div>로딩중</div>;
    if (!missingDetail) return <div>404</div>; //추후에 대체

    return (
        <div className="flex flex-col">
            <div className="shrink-0">
                <ImageCarousel
                    images={
                        missingDetail.profiles?.length > 0
                            ? missingDetail.profiles
                            : ['/logo-placeholder.webp']
                    }
                />
            </div>
            <div className="flex items-center justify-between gap-4 bg-white p-4">
                <div className="flex items-center gap-4">
                    <Avatar />
                    <div>
                        <h1 className="font-semibold">{missingDetail.memberNickname}</h1>
                        <p className="text-gray-40 text-sm">
                            {formatRelativeTime(missingDetail.createdAt)}
                        </p>
                    </div>
                </div>
                <div
                    className="bg-gray-10 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 p-2"
                    onClick={() => router.push(`/missing/detail/${id}/report`)}
                >
                    <Siren strokeWidth={1} color="#fe4444" />
                    <p className="text-gray-40">신고</p>
                </div>
            </div>
            <div className="bg-gray-10 h-4"></div>
            <div className="flex flex-col gap-4 p-4">
                <Tag variant={missingDetail.animalType} size="sm" className="w-fit">
                    {missingDetail.animalType === 'MISSING' ? '실종' : '목격'}
                </Tag>
                <Form className="border-0 p-0" title={missingDetail.title}>
                    <p>{missingDetail.content}</p>
                    <hr className="bg-gray-10" />
                    <div className="flex gap-2">
                        {missingDetail.tags.map((tag) => (
                            <Tag key={tag} variant="default" size="sm">
                                {tag}
                            </Tag>
                        ))}
                    </div>
                </Form>
            </div>
            <div className="bg-gray-10 h-4"></div>
            <Form className="border-0 p-4" title="상세 정보">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <InformationDetail
                        item={{ title: '품종', context: missingDetail.breedType ?? '미상' }}
                    />
                    <InformationDetail
                        item={{
                            title: '중성화',
                            context: missingDetail.neuteredState,
                        }}
                    />
                    <InformationDetail
                        item={{ title: '성별', context: formatSex(missingDetail.sex) }}
                    />
                    <InformationDetail item={{ title: '색상', context: missingDetail.color }} />
                </div>
            </Form>
            <div className="bg-gray-10 h-4"></div>
            <Form className="gap-4 border-0 p-4" title="목격 위치">
                <div className="flex flex-col gap-4">
                    {!loading && !error && (
                        <StaticMap
                            longitude={missingDetail.latitude}
                            latitude={missingDetail.longitude}
                            markerType={missingDetail.animalType}
                            height="200px"
                        />
                    )}

                    <div className="bg-gray-10 rounded-lg p-3">
                        {missingDetail.city} {missingDetail.town}
                    </div>
                </div>
            </Form>
            <div className="sticky bottom-0 z-10 bg-white p-4">
                <Button className="w-full" onClick={() => router.push('/chat')}>
                    채팅하기
                </Button>
            </div>
        </div>
    );
};

export default LostDetailPage;
