'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';

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

    onAvatarClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
    onAvatarClick,
    ...rest
}: ChatPreviewProps) {
    return (
        <div
            className={cn(
                'flex w-full flex-col items-start gap-1 rounded-xl',
                unreadCount !== undefined && unreadCount > 0 ? 'bg-[#FFF9F0]' : 'bg-white'
            )}
            {...rest}
        >
            <div className="flex w-full items-center justify-between gap-3 px-4 py-2">
                <Avatar
                    src={avatarSrc}
                    alt={avartarAlt}
                    size={avartarSize}
                    showStatus={avartarShowStatus}
                    className="shrink-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAvatarClick?.(e);
                    }}
                />
                <div className="flex min-w-0 flex-1 items-start justify-between whitespace-nowrap">
                    <div className="flex min-w-0 flex-col gap-2">
                        <p className="text-lg font-bold">{userName}</p>
                        <p className="text-md truncate">{lastMessage}</p>
                    </div>
                    <div className="flex min-w-12 shrink-0 flex-col items-center gap-2">
                        <p className="text-md text-gray-500">{timestamp}</p>
                        {unreadCount !== undefined && unreadCount > 0 && (
                            <div className="bg-destructive w-6 rounded-full px-2 py-1">
                                <p className="text-center text-xs font-semibold text-white">
                                    {unreadCount}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
