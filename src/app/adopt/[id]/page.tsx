import { Form } from '@/components/layout/Form';
import { ImageCarousel } from '@/components/layout/ImageCarousel';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Button } from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import React from 'react';

interface AdoptDetailPageProps {
    params: Promise<{ id: string }>;
}

const adoptDetailTestImages = {
    images: [
        'https://placedog.net/500/280',
        'https://placedog.net/500/280',
        'https://placedog.net/500/280',
    ],
};

const adoptDetailTestData = {
    type: '말티즈',
    age: '3살',
    sex: '수컷',
    weight: '4.5kg',
    tags: ['중성화 완료', '예방접종 완료', '친화적', '친화적', '친화적', '친화적'],
};

const AdoptDetailPage = async ({ params }: AdoptDetailPageProps) => {
    const { id } = await params;

    return (
        <div className="relative">
            <div>
                <ImageCarousel images={adoptDetailTestImages.images} />
            </div>
            <div className="bg-gray-10 flex flex-col gap-4">
                <div className="flex flex-col gap-4 bg-white py-6">
                    <div className="grid grid-cols-2 gap-4 px-4">
                        <InformationDetail
                            index={0}
                            item={{ title: '품종', context: adoptDetailTestData.type }}
                        />
                        <InformationDetail
                            index={0}
                            item={{ title: '나이', context: adoptDetailTestData.age }}
                        />
                        <InformationDetail
                            index={0}
                            item={{ title: '성별', context: adoptDetailTestData.sex }}
                        />
                        <InformationDetail
                            index={0}
                            item={{ title: '무게', context: adoptDetailTestData.weight }}
                        />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-3 px-4">
                        {adoptDetailTestData.tags.map((tag, idx) => (
                            <Tag key={idx} size="lg">
                                {tag}
                            </Tag>
                        ))}
                    </div>
                </div>
                <div className="bg-white px-4 py-4">
                    <Form title="보호소 정보">
                        <div className="bg-primary text-gray-10 rounded-lg px-6 py-4">
                            <p className="mb-4 text-[1.2rem] font-semibold">사랑동물보호소</p>
                            <div className="text-[1rem] leading-loose font-light">
                                <p>서울특별시 강남구 테헤란로 123</p>
                                <p>평일 10:00 - 18:00</p>
                                <p>02-1234-5678</p>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="sticky right-0 bottom-0 left-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex gap-2">
                    <Button className="flex-1">입양 문의하기</Button>
                </div>
            </div>
        </div>
    );
};

export default AdoptDetailPage;
