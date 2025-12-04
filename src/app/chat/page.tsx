'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from '@/components/layout/Search';
import { useChatListData } from '@/hook/chat/useChatListData';
import { ChatPreview } from '@/components/layout/ChatPreview';
import { ChatPost } from '@/components/layout/ChatPost';

interface dataType {
    id: number;
    avatar: string;
    userName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

const ChatListPage = () => {
    const { data } = useChatListData();
    const [tab, setTab] = React.useState<'all' | 'unread'>('all');
    const visiblaList = React.useMemo(() => {
        if (!data) return [];
        if (tab === 'all') return data;
        return data.filter((item) => item.unreadCount > 0);
    }, [data, tab]);

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
            {visiblaList.map((item, index) => {
                return (
                    <div key={index} className="mb-2 flex flex-col items-center gap-1 shadow-md">
                        <ChatPreview
                            // avatarSrc={item.avatar}
                            // avartarAlt={item.avatar}
                            userName={item.userName}
                            lastMessage={item.lastMessage}
                            timestamp={item.lastMessageTime}
                            unreadCount={item.unreadCount}
                        />
                        <div className="w-[80%]">
                            <ChatPost title={item.title} post={item.post} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatListPage;
