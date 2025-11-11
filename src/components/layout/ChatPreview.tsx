'use client';

import React from 'react';
import { Avatar } from './Avatar';
import { ChatPost, Title } from './ChatPost';

interface ChatPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    // Avatar props
    avatarSrc?: string;
    avartarAlt?: string;
    avartarSize?: number;
    avartarShowStatus?: boolean;

    // Chat preview props
    userName?: string;
    lastMessage?: string;
    timestamp?: string;
    unreadCount?: number;

    // Chat Post props
    title?: Title;
    post?: string;

    // callback
    onAvatarClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onPostAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
    onPostClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ChatPreview({
    avatarSrc,
    avartarAlt,
    avartarSize,
    avartarShowStatus,
    userName,
    lastMessage,
    timestamp,
    unreadCount,
    title,
    post,

    onAvatarClick,
    onPostAvatarClick,
    onPostClick,
    ...rest
}: ChatPreviewProps) {
    return (
        <div
            className="flex w-full flex-col items-start gap-1 rounded-xl bg-[#FFF9F0] shadow-md"
            {...rest}
        >
            <div className="flex w-full items-center justify-between gap-3 px-4 py-2">
                <Avatar
                    src={avatarSrc}
                    alt={avartarAlt}
                    size={avartarSize}
                    showStatus={avartarShowStatus}
                    className="shrink-0"
                    onClick={onAvatarClick}
                />
                <div className="flex min-w-0 flex-1 items-start justify-between whitespace-nowrap">
                    <div className="flex min-w-0 flex-col gap-2">
                        <p className="text-lg font-bold">{userName}</p>
                        <p className="text-md truncate">{lastMessage}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-2">
                        <p className="text-md text-gray-500">{timestamp}</p>
                        <div className="rounded-full bg-red-500 px-2 py-1">
                            <p className="text-xs font-semibold text-white">{unreadCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[80%] pl-10">
                <ChatPost
                    title={title}
                    post={post}
                    onClick={onPostClick}
                    onAvatarClick={onPostAvatarClick}
                />
            </div>
        </div>
    );
}
