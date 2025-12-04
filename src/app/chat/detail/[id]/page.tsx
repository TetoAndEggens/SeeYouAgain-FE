'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useChatListData, useChatDetailData } from '@/hook/chat/useChatListData';
import { ChatMessage } from '@/components/layout/ChatMessage';
import { ChatPost } from '@/components/layout/ChatPost';
import { ChevronLeft } from 'lucide-react';

type Props = {
    params: Promise<{ id: number }>;
};

const ChatRoomPage = ({ params }: Props) => {
    const router = useRouter();
    const { data: listData } = useChatListData();
    const { id } = React.use(params);
    const list = listData[id - 1];
    const { data } = useChatDetailData();
    console.log('listData : ', listData[id]);

    return (
        <div>
            <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-600 bg-[#F8F9FA] p-4">
                <div className="flex items-center justify-between bg-auto">
                    <button
                        aria-label={'뒤로가기'}
                        onClick={() => router.back()}
                        className="cursor-pointer"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => router.back()} className="cursor-pointer">
                        <p className="text-lg font-bold">{list.userName}</p>
                    </button>
                </div>
            </div>
            <div>
                <div>
                    <ChatPost title={list.title} post={list.post} className="rounded-lg border" />
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex justify-center">
                                <p className="bg-gray-20 m-4 rounded-lg border px-4 py-2">
                                    {item.date}
                                </p>
                            </div>
                            {item.content.map((content, contentIdx) => {
                                return (
                                    <div key={contentIdx}>
                                        <ChatMessage
                                            message={content.message}
                                            mine={content.isMe}
                                            time={content.time}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatRoomPage;
