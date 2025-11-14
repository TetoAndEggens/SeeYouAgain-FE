'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { Form } from '@/components/layout/Form';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/layout/Avatar';
import { ChatPreview } from '@/components/layout/ChatPreview';
import { ChatPost } from '@/components/layout/ChatPost';
import { InformationDetail } from '@/components/layout/InformationDetail';
import { Tag } from '@/components/layout/Tag';
import { ChatMessage } from '@/components/layout/ChatMessage';

const TestPage = () => {
    const element = [
        {
            title: 'test',
            context: 'test',
        },
        {
            title: 'test',
            context: 'test',
        },
        {
            title: 'test',
            context: 'test',
        },
        {
            title: 'test',
            context: 'test',
        },
    ];

    const tag = [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
        'test7',
        'test8',
        'test9',
        'test10',
        'test11',
        'test12',
    ];

    return (
        <div className="whitespace-pre-line md:w-full">
            <div className="flex w-full flex-wrap gap-2 p-2">
                <div className="flex w-full justify-center gap-2 p-2">
                    <Form
                        title="복순이"
                        className="w-1/2"
                        elementChildren={
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                {element?.map((item, index) => {
                                    return (
                                        <InformationDetail key={index} index={index} item={item} />
                                    );
                                })}
                            </div>
                        }
                        tagChildren={tag?.map((item, index) => {
                            return <Tag index={index} item={item} />;
                        })}
                    />
                    <Form
                        title="복순이"
                        className="w-1/2"
                        elementChildren={
                            <div className="mt-2 grid grid-cols-1 gap-4">
                                {element?.map((item, index) => {
                                    return (
                                        <InformationDetail key={index} index={index} item={item} />
                                    );
                                })}
                            </div>
                        }
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
                    onClick={(e) => {
                        console.log('chat e e : ', e);
                    }}
                    onAvatarClick={(e) => {
                        console.log('avatar e : ', e);
                    }}
                />

                <div className="flex w-full flex-col items-start gap-1 rounded-xl bg-[#FFF9F0] pl-10 shadow-md">
                    <ChatPost title="실종" post="제가 실종되었어요!!" />
                </div>
            </div>
            <div>
                <ChatMessage
                    message={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aspernatur eius dignissimos aliquid? '
                    }
                    time={'오전 10:30'}
                    mine={true}
                />
                <ChatMessage
                    message={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aspernatur eius dignissimos aliquid? '
                    }
                    time={'오전 10:30'}
                    mine={false}
                />
                <ChatMessage
                    message={
                        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, sed nam excepturi eveniet ipsa eum in nihil obcaecati rem id, doloremque tempore deserunt quia aliquid a. Repudiandae tenetur ex obcaecati.'
                    }
                    time={'오전 10:30'}
                    mine={true}
                />
            </div>
        </div>
    );
};

export default TestPage;
