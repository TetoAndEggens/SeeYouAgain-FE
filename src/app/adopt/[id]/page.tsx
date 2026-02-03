'use client';

import { use, useEffect } from 'react';
import { fetchAdoptAnimalsById } from '@/api/animal';
import { useBookmark } from '@/hook/bookmark/useBookmark';
import { Form } from '@/components/layout/Form';
import { ImageCarousel } from '@/components/layout/ImageCarousel';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Button } from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import { calculateAgeFromYear } from '@/lib/date-utils';
import { formatSex } from '@/lib/format-utils';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdoptDetailPageProps {
    params: Promise<{ id: string }>;
}

const AdoptDetailPage = ({ params }: AdoptDetailPageProps) => {
    const { id } = use(params);
    const { data: adoptDetail, isLoading } = useQuery({
        queryKey: ['adoptAnimal', id],
        queryFn: () => fetchAdoptAnimalsById(Number(id)),
        select: (data) => data.data,
    });

    const { check, postBookmark, isBookmarked } = useBookmark();

    useEffect(() => {
        if (id) {
            isBookmarked(Number(id));
        }
    }, [id, isBookmarked]);

    if (isLoading) return <div>로딩중</div>;
    if (!adoptDetail) return <div>404</div>; //추후에 대체

    return (
        <div className="relative">
            <ImageCarousel images={adoptDetail.profiles ?? ['/public/logo-placeholder.webp']} />
            <div className="bg-gray-10 flex flex-col gap-4">
                <div className="flex flex-col gap-4 bg-white py-6">
                    <div className="grid grid-cols-2 gap-4 px-4">
                        <InformationDetail
                            index={0}
                            item={{ title: '품종', context: adoptDetail.breedType ?? '불명' }}
                        />
                        <InformationDetail
                            index={0}
                            item={{
                                title: '나이',
                                context:
                                    // calculateAgeFromYear(
                                    //     Number(adoptDetail.birth.slice(0, 4))
                                    // ).toString() ?? '불명',
                                    adoptDetail.birth,
                            }}
                        />
                        <InformationDetail
                            index={0}
                            item={{
                                title: '성별',
                                context: formatSex(adoptDetail?.sex),
                            }}
                        />
                        <InformationDetail
                            index={0}
                            item={{ title: '무게', context: adoptDetail.weight ?? '불명' }}
                        />
                    </div>
                    {adoptDetail.neuteredState === 'Y' && (
                        <div className="mt-2 px-4">
                            <Tag size="lg">중성화 완료</Tag>
                        </div>
                    )}
                </div>
                <div className="bg-white px-4 py-4">
                    <Form title="보호소 정보">
                        <div className="bg-primary text-gray-10 rounded-lg px-6 py-4">
                            <p className="mb-4 text-[1.2rem] font-semibold">
                                {adoptDetail.centerName}
                            </p>
                            <div className="text-[1rem] leading-loose font-light">
                                <p>{adoptDetail.centerAddress}</p>
                                <p>{adoptDetail.centerPhone}</p>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="sticky right-0 bottom-0 left-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex gap-2">
                    <Button
                        className="group border-none bg-white hover:bg-transparent!"
                        variant="outline"
                        size="icon-lg"
                        onClick={() => postBookmark(Number(id))}
                    >
                        <Heart
                            color={`${check ? 'red' : 'black'}`}
                            fill={`${check ? 'red' : 'none'}`}
                            className={cn(
                                'size-6 transition-none',
                                check
                                    ? 'group-hover:fill-transparent! group-hover:stroke-black!'
                                    : 'group-hover:fill-red-500! group-hover:stroke-red-500!'
                            )}
                        />
                    </Button>
                    <Button className="flex-1">입양 문의하기</Button>
                </div>
            </div>
        </div>
    );
};

export default AdoptDetailPage;
