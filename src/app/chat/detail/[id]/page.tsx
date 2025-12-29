'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/hook/chat/useMessage';
import { ChatMessage } from '@/components/layout/ChatMessage';
import { ChatPost } from '@/components/layout/ChatPost';
import { ChevronLeft } from 'lucide-react';
import { CirclePlus, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    params: { id: string };
};

const ChatRoomPage = ({ params }: Props) => {
    const router = useRouter();
    const chatRoomId = Number(params.id);
    const messages = useMessage({
        chatRoomId,
        cursorId: null,
        size: 20,
        sortDirection: 'LATEST',
    });

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
                        {/* <p className="text-lg font-bold">{list.userName}</p> */}
                    </button>
                </div>
            </div>
            <div>
                {/* <div>
                    <ChatPost title={list.title} post={list.post} className="rounded-lg border" />
                </div> */}
                {!messages ? (
                    <div className="p-4 text-center">로딩 중입니다.</div>
                ) : messages.data.length === 0 ? (
                    <div className="p-4 text-center">메시지가 없습니다.</div>
                ) : (
                    messages.data.map((m) => {
                        // mine 판단은 실제 내 사용자 ID 기준으로 비교하셔야 합니다.
                        // const mine = m.senderId === myMemberId;
                        const mine = false; // 수정 필요(임시)

                        return (
                            <ChatMessage
                                key={m.messageId}
                                message={m.content}
                                mine={mine}
                                time={m.createdAt}
                            />
                        );
                    })
                )}
            </div>
            <div className="sticky bottom-0 flex items-center gap-4 bg-white p-2">
                {/* <CirclePlus /> */}
                <Input />
                <Send />
            </div>
        </div>
    );
};

export default ChatRoomPage;
