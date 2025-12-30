'use client';

import { use } from 'react';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TriangleAlert } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchBoardById } from '@/api/board';

const list = [
    {
        title: '스팸/광고',
        describe: '상업적 광고, 홍보글, 도배성 게시글',
    },
    {
        title: '허위 정보',
        describe: '거짓 실종 신고, 조작된 정보',
    },
    {
        title: '중복 게시글',
        describe: '같은 실종 동물을 반복적으로 게시',
    },
    {
        title: '부적절한 내용',
        describe: '욕설, 비방, 혐오 표현, 동물 학대',
    },
    {
        title: '개인정보 노출',
        describe: '타인의 개인정보 무단 게재',
    },
    {
        title: '사기 의심',
        describe: '금전 요구, 사기성 게시글',
    },
];

const ReportPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { data: missingDetail } = useQuery({
        queryKey: ['boardListById', id],
        queryFn: () => fetchBoardById(Number(id)),
        select: (data) => data.data,
    });

    return (
        <div className="relative flex flex-col">
            <div className="flex items-center gap-3 px-5 py-4">
                <TriangleAlert size={24} />
                <div className="">
                    <p className="text-xs font-semibold">허위 신고 금지</p>
                    <p className="text-xs">
                        거짓 신고나 악의적인 목적의 신고는 제재 대상이 될 수 있습니다.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 px-5 py-4">
                <p>신고 대상</p>
                <div>
                    {missingDetail && (
                        <MissingLargeCard
                            title={missingDetail.title}
                            animalType={missingDetail.animalType}
                            breedType={missingDetail.breedType}
                            tags={missingDetail.tags}
                            city={missingDetail.city}
                            town={missingDetail.town}
                            createdAt={missingDetail.createdAt}
                            profile={missingDetail.profiles[0]}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1 px-5 py-4">
                <p>신고 항목</p>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="신고 항목을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {list.map((item, index) => (
                            <SelectItem key={index} value={item.title}>
                                <div className="flex flex-col">
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.describe}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1 px-5 py-4">
                <p>상세 내용</p>
                <div>
                    <Textarea
                        placeholder={`신고 사유를 구체적으로 작성해주세요.\n\t예시\n\t  · 허위 정보의 구체적인 내용\n\t  · 문제가 된 발언이나 행동\n\t  · 추가 설명이 필요한 사항`}
                    />
                </div>
            </div>
            <div className="flex items-center gap-1 px-5 py-4">
                <Checkbox defaultChecked />
                <p>신고 내용이 사실이며, 허위 신고 시 제재를 받을 수 있음을 확인했습니다.</p>
            </div>
            <div className="sticky bottom-0 bg-white p-4">
                <Button className="w-full" onClick={() => console.log('신고 접수하기')}>
                    신고하기
                </Button>
            </div>
        </div>
    );
};

export default ReportPage;
