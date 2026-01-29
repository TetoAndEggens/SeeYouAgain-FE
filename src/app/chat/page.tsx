'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search } from '@/components/layout/Search';
import { useChatRoomData, useUnread } from '@/hook/chat/useChatList';
import { ChatPreview } from '@/components/layout/ChatPreview';
import { ChatPost } from '@/components/layout/ChatPost';
import { connect, disconnect } from '@/lib/stompClient';

interface dataType {
    id: number;
    avatar: string;
    userName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

const ChatListPage = () => {
    const chatRooms = useChatRoomData();
    const unRead = useUnread(); // 기존 변수명 유지
    const router = useRouter();
    const [tab, setTab] = React.useState<'all' | 'unread'>('all');

    // 수정: 탭에 따라 보여줄 데이터 선택
    const visibleRooms = tab === 'all' ? chatRooms : unRead;

    // 수정: “읽지 않음” 탭에서 API가 비어있거나 미사용이라면, 전체 목록에서 unreadCount로 필터링해 fallback 제공
    // const fallbackUnreadList =
    //     tab === 'unread' && chatRooms
    //         ? chatRooms.data.filter((item) => (item.unreadCount ?? 0) > 0)
    //         : [];

    // const visibleList =
    //     tab === 'unread'
    //         ? (visibleRooms?.data ?? fallbackUnreadList) // 수정: unread는 API 우선, 없으면 fallback
    //         : (visibleRooms?.data ?? []);

    const isLoading = !visibleRooms && tab === 'all' ? !chatRooms : !visibleRooms; // 수정: 탭 기준 로딩 판정
    // const visiblaList = React.useMemo(() => {
    //     if (!data) return [];
    //     if (tab === 'all') return data;
    //     return data.filter((item) => item.unreadCount > 0);
    // }, [data, tab]);

    React.useEffect(() => {
        connect();
        return () => disconnect();
    }, []);

    return (
        <div className="flex w-full flex-col">
            <Search />

            <div className="flex w-full justify-between p-2">
                <div className={cn('flex w-full justify-center')} onClick={() => setTab('all')}>
                    <p
                        className={cn(
                            'h-7 w-[70%] text-center',
                            tab === 'all' ? 'border-primary border-b-2' : ''
                        )}
                    >
                        전체
                    </p>
                </div>

                <div className={cn('flex w-full justify-center')} onClick={() => setTab('unread')}>
                    <p
                        className={cn(
                            'h-7 w-[70%] text-center',
                            tab === 'unread' ? 'border-primary border-b-2' : ''
                        )}
                    >
                        읽지 않음
                    </p>
                </div>
            </div>

            {/* {isLoading ? ( // 수정: 탭 기준 로딩 표시
                <div className="p-4 text-center">로딩 중입니다.</div>
            ) : visibleList.length === 0 ? ( // 수정: 탭 기준 빈 목록 표시
                <div className="p-4 text-center">
                    {tab === 'all' ? '채팅방이 없습니다.' : '읽지 않은 채팅이 없습니다.'}
                </div>
            ) : (
                visibleList.map((item) => {
                    return (
                        <div
                            key={item.chatRoomId}
                            className="mb-2 flex flex-col items-center shadow-md"
                        >
                            <ChatPreview
                                userName={item.otherMemberNickname}
                                lastMessage={item.lastMessage}
                                timestamp={item.lastMessageTime}
                                unreadCount={item.unreadCount}
                                onClick={() => router.push(`/chat/detail/${item.chatRoomId}`)}
                            />

                            <div
                                className={cn(
                                    'flex w-full justify-center',
                                    item.unreadCount !== undefined && item.unreadCount > 0
                                        ? 'bg-[#FFF9F0]'
                                        : 'bg-white'
                                )}
                            >
                                <ChatPost
                                    title={item.contentType}
                                    post={item.boardTitle}
                                    className="w-[80%]"
                                />
                            </div>
                        </div>
                    );
                })
            )} */}
        </div>
    );
};

export default ChatListPage;
