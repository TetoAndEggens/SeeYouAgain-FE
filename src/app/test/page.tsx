'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { Form } from '@/components/layout/Form';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/layout/Avatar';
import { ChatPreview } from '@/components/layout/ChatPreview';
import { ChatPost } from '@/components/layout/ChatPost';

const TestPage = () => {
    const [on, setOn] = React.useState(false);
    return (
        <div className="mb-25 whitespace-pre-line md:w-full">
            <div>
                <Header variant="back" />
            </div>

            <div className="flex w-full flex-wrap gap-2 p-2">
                <Form
                    title="복돌이"
                    element={[
                        { title: '품종', context: '코코카커서스' },
                        { title: '나이', context: '3살' },
                        { title: '성별', context: '수컷' },
                        { title: '무게', context: '5.4 kg' },
                    ]}
                    tag={[
                        '긴급',
                        '중성화O',
                        '예방접종O',
                        '등록됨',
                        '건강함',
                        '활발함',
                        '사람을 잘 따름',
                    ]}
                />
                <div className="flex w-full justify-center gap-2 p-2">
                    <Form
                        title="복순이"
                        element={[
                            { title: '품종', context: '코코카커서스코코카커서스' },
                            { title: '나이', context: '3살' },
                            { title: '성별', context: '암컷' },
                            { title: '무게', context: '5.4 kg' },
                        ]}
                        tag={[
                            '긴급',
                            '중성화O',
                            '예방접종O',
                            '등록됨',
                            '건강함',
                            '활발함',
                            '사람을 잘 따름',
                        ]}
                        className="w-1/2"
                    />
                    <Form
                        title="복순이"
                        element={[
                            { title: '품종', context: '말티즈' },
                            { title: '나이', context: '3살' },
                            { title: '성별', context: '암컷' },
                            { title: '무게', context: '5.4 kg' },
                        ]}
                        tag={[
                            '긴급',
                            '중성화O',
                            '예방접종O',
                            '등록됨',
                            '건강함',
                            '활발함',
                            '사람을 잘 따름',
                        ]}
                        className="w-1/2"
                    />
                </div>
            </div>
            <div>
                <ChatPreview
                    userName="김유신"
                    lastMessage="정말 감사합니다! 지금 바로 가볼게요! 정말 감사합니다! 지금 바로 가볼게요!"
                    timestamp="방금 전"
                    unreadCount={2}
                    title="보호"
                    post="흰색 말티즈를 찾습니다. 몸에 분홍색 하네스를 하고 있습니다."
                />
            </div>
            <div>
                <NavigationMenu></NavigationMenu>
            </div>
        </div>
    );
};

export default TestPage;
