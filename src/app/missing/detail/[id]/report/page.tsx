'use client';

import { use, useState } from 'react';
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
import { Form } from '@/components/layout/Form';

const list = [
    {
        title: '스팸/광고',
        describe: '상업적 광고, 홍보글, 도배성 게시글',
        reason: 'SPAM',
    },
    {
        title: '욕설/비방',
        describe: '욕설, 비방, 혐오 표현',
        reason: 'ABUSE',
    },
    {
        title: '음란물/성적 콘텐츠',
        describe: '성적인 내용, 부적절한 이미지',
        reason: 'SEXUAL_CONTENT',
    },
    {
        title: '개인정보 노출',
        describe: '타인의 개인정보 무단 게재',
        reason: 'PRIVACY_VIOLATION',
    },
    {
        title: '불법 콘텐츠',
        describe: '동물 학대, 불법 거래 등',
        reason: 'ILLEGAL_CONTENT',
    },
    {
        title: '사기/허위 정보',
        describe: '거짓 실종 신고, 금전 요구, 사기성 게시글',
        reason: 'FRAUD',
    },
    {
        title: '폭력적 콘텐츠',
        describe: '폭력적이거나 잔인한 내용',
        reason: 'VIOLENCE',
    },
    {
        title: '기타',
        describe: '위 항목에 해당하지 않는 신고 사유',
        reason: 'ETC',
    },
];

const ReportPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [reason, setReason] = useState('');
    const [detailReason, setDetailReason] = useState('');

    const { data: missingDetail } = useQuery({
        queryKey: ['boardListById', id],
        queryFn: () => fetchBoardById(Number(id)),
        select: (data) => data.data,
    });

    return (
        <div className="relative flex h-full flex-col">
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4">
                    <TriangleAlert size={24} className="text-yellow-600" />
                    <div>
                        <p className="text-xs font-semibold">허위 신고 금지</p>
                        <p className="text-xs">
                            거짓 신고나 악의적인 목적의 신고는 제재 대상이 될 수 있습니다.
                        </p>
                    </div>
                </div>

                <Form title="신고 대상">
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
                </Form>

                <Form title="신고 항목" important>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="신고 항목을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                            {list.map((item, index) => (
                                <SelectItem key={index} value={item.reason}>
                                    <div className="flex flex-col items-start">
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-xs text-gray-500">{item.describe}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Form>

                <Form title="상세 내용">
                    <Textarea
                        value={detailReason}
                        onChange={(e) => setDetailReason(e.target.value)}
                        className="h-28 resize-none"
                        placeholder={`신고 사유를 구체적으로 작성해주세요.\n\t예시\n\t  · 허위 정보의 구체적인 내용\n\t  · 문제가 된 발언이나 행동\n\t  · 추가 설명이 필요한 사항`}
                    />
                </Form>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="confirm"
                        checked={isConfirmed}
                        onCheckedChange={(checked) => setIsConfirmed(checked === true)}
                    />
                    <label htmlFor="confirm" className="cursor-pointer text-sm">
                        신고 내용이 사실이며, 허위 신고 시 제재를 받을 수 있음을 확인했습니다.
                    </label>
                </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4">
                <Button
                    className="w-full"
                    onClick={() => console.log('신고 접수하기')}
                    disabled={!isConfirmed}
                >
                    신고하기
                </Button>
            </div>
        </div>
    );
};

export default ReportPage;
