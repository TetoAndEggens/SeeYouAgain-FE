'use client';

import { use, useState } from 'react';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CustomSelect from '@/components/layout/Selector';
import { TriangleAlert } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchBoardById } from '@/api/board';
import { Form } from '@/components/layout/Form';

const reportOptions = [
    {
        items: [
            { value: 'SPAM', name: '스팸/광고' },
            { value: 'ABUSE', name: '욕설/비방' },
            { value: 'SEXUAL_CONTENT', name: '음란물/성적 콘텐츠' },
            { value: 'PRIVACY_VIOLATION', name: '개인정보 노출' },
            { value: 'ILLEGAL_CONTENT', name: '불법 콘텐츠' },
            { value: 'FRAUD', name: '사기/허위 정보' },
            { value: 'VIOLENCE', name: '폭력적 콘텐츠' },
            { value: 'ETC', name: '기타' },
        ],
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
                    <CustomSelect
                        options={reportOptions}
                        placeholder="신고 항목을 선택해주세요"
                        onValueChange={(value) => setReason(value)}
                    />
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
                    disabled={!isConfirmed || reason === ''}
                >
                    신고하기
                </Button>
            </div>
        </div>
    );
};

export default ReportPage;
