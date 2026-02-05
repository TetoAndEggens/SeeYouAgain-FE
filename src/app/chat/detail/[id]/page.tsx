'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send } from 'lucide-react';
import { ChatMessage } from '@/components/layout/ChatMessage';
import { Input } from '@/components/ui/input';
import { useMessage } from '@/hook/chat/useMessage';
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
    const ref = React.useRef<HTMLDivElement>(null);
    const bottomRef = React.useRef<boolean>(true);
    const chatRoomId = Number(params.id);

    const { chatMessage, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useMessage({
            chatRoomId,
            cursorId: null,
            size: 20,
            sortDirection: 'OLDEST',
        });

    const [inputValue, setInputValue] = React.useState<string>('');
    const [liveMessages, setLiveMessages] = React.useState<MessageItem[]>([]);

    React.useEffect(() => {
        connect();
        setLiveMessages([]); // 채팅방 이동 시 이전 방 live 메시지 초기화

        // 개인 채널 구독 코드
        subscribePersonal((payload) => {
            if (payload.chatRoomId !== chatRoomId) return;
            if (!payload.content) return;

            const nextItem: MessageItem = {
                messageId: payload.messageId,
                senderId: payload.senderId,
                content: payload.content,
                isRead: payload.isRead,
                isMyChat: payload.isMyChat,
                createdAt: payload.createdAt,
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

    const onScroll = React.useCallback(() => {
        const el = ref.current;
        if (!el) return;

        const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;

        bottomRef.current = bottom < 80;

        if (bottom < 200 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (!bottomRef.current) return;

        el.scrollTop = el.scrollHeight;
    }, [mergedMessages.length]);

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
                </div>
            </div>

            <div className="flex-1 overflow-y-auto" ref={ref} onScroll={onScroll}>
                {isLoading ? (
                    <div className="p-4 text-center">로딩 중입니다.</div>
                ) : isError ? (
                    <div className="p-4 text-center">메시지를 불러오지 못했습니다.</div>
                ) : mergedMessages.length === 0 ? (
                    <div className="p-4 text-center">메시지가 없습니다.</div>
                ) : (
                    mergedMessages.map((m) => {
                        return (
                            <ChatMessage
                                key={m.messageId}
                                message={m.content}
                                mine={m.isMyChat}
                                time={m.createdAt}
                            />
                        );
                    })
                )}

                <div>
                    {/* <ChatPost title={list.title} post={list.post} className="rounded-lg border" /> */}
                </div>
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
