'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/hook/chat/useMessage';
// import { useChatListData, useChatDetailData } from '@/hook/chat/useChatListData';
import { ChatMessage } from '@/components/layout/ChatMessage';
import { ChevronLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    connect,
    subscribePersonal,
    unsubscribePersonal,
    sendChatMessage,
} from '@/lib/stompClient';
import type { Message as MessageItem } from '@/types/chat';

type Props = {
    params: { id: string };
};

const ChatRoomPage = ({ params }: Props) => {
    const router = useRouter();
    const chatRoomId = Number(params.id);

    const { chatMessage, isLoading, isError } = useMessage({
        chatRoomId,
        cursorId: null, // 수정 필요(임시)
        size: 20,
        sortDirection: 'LATEST',
    });

    const [inputValue, setInputValue] = React.useState<string>('');
    const [liveMessages, setLiveMessages] = React.useState<MessageItem[]>([]);

    React.useEffect(() => {
        connect();

        // 개인 채널 구독 코드
        subscribePersonal((payload: any) => {
            if (payload?.chatRoomId !== undefined && Number(payload.chatRoomId) !== chatRoomId)
                return;

            const content = typeof payload === 'string' ? payload : payload?.content;
            if (!content) return;

            const nextItem: MessageItem = {
                messageId: payload?.messageId ?? Date.now(),
                senderId: payload?.senderId ?? 0,
                content,
                isRead: payload?.isRead ?? false,
                createdAt: payload?.createdAt ?? payload?.time ?? new Date().toISOString(),
            };

            setLiveMessages((prev) => [...prev, nextItem]);
        });

        return () => {
            unsubscribePersonal();
        };
    }, [chatRoomId]);

    const mergedMessages = React.useMemo(() => {
        const base = chatMessage?.data ?? [];
        return [...base, ...liveMessages];
    }, [chatMessage?.data, liveMessages]);

    const onSend = () => {
        const content = inputValue.trim();
        if (!content) return;

        // 채팅 전송 코드
        sendChatMessage({
            chatRoomId,
            content,
        });

        setInputValue('');
    };

    return (
        <div className="flex h-dvh flex-col">
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

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center">로딩 중입니다.</div>
                ) : isError ? (
                    <div className="p-4 text-center">메시지를 불러오지 못했습니다.</div>
                ) : mergedMessages.length === 0 ? (
                    <div className="p-4 text-center">메시지가 없습니다.</div>
                ) : (
                    mergedMessages.map((m) => {
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

                <div>
                    {/* <ChatPost title={list.title} post={list.post} className="rounded-lg border" /> */}
                </div>

                {/* 날짜 표시 테스트 코드 */}
                {/* {chatMessage?.data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex justify-center">
                                <p className="bg-gray-20 m-4 rounded-lg border px-4 py-2">
                                    {item.createdAt}
                                </p>
                            </div>
                        </div>
                    );
                })} */}
            </div>

            <div className="flex shrink-0 items-center gap-4 bg-white p-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSend();
                    }}
                />
                <button type="button" onClick={onSend} aria-label="전송" className="cursor-pointer">
                    <Send />
                </button>
            </div>
        </div>
    );
};

export default ChatRoomPage;
