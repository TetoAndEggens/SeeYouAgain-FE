'use client';

import React from 'react';
import { MissingLargeCard } from '@/components/features/missing/MissingLargeCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TriangleAlert } from 'lucide-react';

const ReportPage = () => {
    const list = [
        {
            title: '스팸/광고',
            describe: '상업적 광고, 홍보글',
        },
        {
            title: '내용2',
            describe: '상업적 광고, 홍보글',
        },
        {
            title: '내용3',
            describe: '상업적 광고, 홍보글',
        },
        {
            title: '내용4',
            describe: '상업적 광고, 홍보글',
        },
        {
            title: '내용5',
            describe: '상업적 광고, 홍보글',
        },
    ];

    return (
        <div className="flex flex-col">
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
                    <MissingLargeCard
                        cardType="missing"
                        name="test"
                        tags={[]}
                        location="test"
                        date="test"
                        image="https://placedog.net/500/280"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 px-5 py-4">
                <p>신고 항목</p>
                <div className="flex flex-col gap-2 bg-white">
                    <RadioGroup>
                        {list.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 px-4 py-2.75">
                                <RadioGroupItem value={item.title} id={item.title} />
                                <div className="flex flex-col">
                                    <p className="">{item.title}</p>
                                    <p className="">{item.describe}</p>
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
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
