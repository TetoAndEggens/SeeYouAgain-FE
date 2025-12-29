'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search } from '@/components/layout/Search';
import { useChatRoomData } from '@/hook/chat/useChatListData';
import { ChatPreview } from '@/components/layout/ChatPreview';
import { ChatPost } from '@/components/layout/ChatPost';
import { ChatRoomData } from '@/types/chat';

const ChatListPage = () => {
    const chatRooms = useChatRoomData();
    console.log('chat page chatRooms : ', chatRooms);
    const router = useRouter();
    const [tab, setTab] = React.useState<'all' | 'unread'>('all');

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
            {!chatRooms ? (
                <div className="p-4 text-center">로딩 중입니다.</div>
            ) : chatRooms.size === 0 ? (
                <div className="p-4 text-center">채팅방이 없습니다.</div>
            ) : (
                chatRooms.data.map((item, index) => {
                    return (
                        <div key={index} className="mb-2 flex flex-col items-center shadow-md">
                            <ChatPreview
                                // avatarSrc={item.avatar}
                                // avartarAlt={item.avatar}
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
            {/* {visiblaList.map((item, index) => {
                return (
                    <div key={index} className="mb-2 flex flex-col items-center shadow-md">
                        <ChatPreview
                            // avatarSrc={item.avatar}
                            // avartarAlt={item.avatar}
                            userName={item.userName}
                            lastMessage={item.lastMessage}
                            timestamp={item.lastMessageTime}
                            unreadCount={item.unreadCount}
                            onClick={() => router.push(`/chat/detail/${item.id}`)}
                        />
                        <div
                            className={cn(
                                'flex w-full justify-center',
                                item.unreadCount !== undefined && item.unreadCount > 0
                                    ? 'bg-[#FFF9F0]'
                                    : 'bg-white'
                            )}
                        >
                            <ChatPost title={item.title} post={item.post} className="w-[80%]" />
                        </div>
                    </div>
                );
            })} */}
        </div>
    );
};

export default ChatListPage;
