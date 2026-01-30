'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search } from '@/components/layout/Search';
import { useChatRoomData, useUnreadRoomData } from '@/hook/chat/useChatList';
import { ChatPreview } from '@/components/layout/ChatPreview';
import { ChatPost } from '@/components/layout/ChatPost';
import { ChatRoomParam, ChatRoomData } from '@/types/chat';

const ChatListPage = () => {
    const {
        data: chatRooms,
        fetchNextPage: fetchReadNextPage,
        hasNextPage: hasReadNextPage,
        isFetchingNextPage: isFetchingReadNextPage,
        isLoading: isReadLoading,
        isError: isReadError,
    } = useChatRoomData({ cursorId: null, size: 10, sortDirection: 'LATEST' });

    const {
        data: unRead,
        fetchNextPage: fetchUnreadNextPage,
        hasNextPage: hasUnreadNextPage,
        isFetchingNextPage: isFetchingUnreadNextPage,
        isLoading: isUnreadLoading,
        isError: isUnreadError,
    } = useUnreadRoomData({ cursorId: null, size: 10, sortDirection: 'LATEST' });

    const [tab, setTab] = React.useState<'all' | 'unread'>('all');
    const router = useRouter();

    const visibleRooms = tab === 'all' ? chatRooms : unRead;

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

            {isReadLoading || isUnreadLoading ? (
                <div className="p-4 text-center">로딩 중입니다.</div>
            ) : !visibleRooms ? (
                <div className="p-4 text-center">
                    {tab === 'all' ? '채팅방이 없습니다.' : '읽지 않은 채팅이 없습니다.'}
                </div>
            ) : (
                visibleRooms.data.map((item) => {
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
            )}
        </div>
    );
};

export default ChatListPage;
