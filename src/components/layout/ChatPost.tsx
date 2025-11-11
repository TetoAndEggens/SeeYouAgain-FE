'use client';

import React from 'react';
import { Avatar } from '@/components/layout/Avatar';
import { cn } from '@/lib/utils';

const Titles = ['실종', '보호', '목격', '기타'] as const;
export type Title = (typeof Titles)[number];
const TitleStyle: Record<Title, string> = {
    실종: 'bg-red-500 text-white',
    보호: 'bg-green-500 text-white',
    목격: 'bg-blue-500 text-white',
    기타: 'bg-gray-500 text-white',
};

interface ChatPostProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: Title;
    post?: string;

    src?: string;
    alt?: string;
    size?: number;
    showStatus?: boolean;
    className?: string;

    onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function ChatPost({
    title,
    post,
    src,
    alt,
    size,
    showStatus,
    className,
    onAvatarClick,
    ...rest
}: ChatPostProps) {
    return (
        <div className={cn('flex items-center gap-3 px-4 py-2', className)} {...rest}>
            <div className="shrink-0">
                <Avatar
                    src={src}
                    alt={alt}
                    size={size}
                    showStatus={showStatus}
                    className="rounded-xl"
                    onClick={onAvatarClick}
                />
            </div>
            <div className="flex flex-1 flex-col gap-2 overflow-hidden whitespace-nowrap">
                <p
                    className={cn(
                        'w-fit rounded-2xl px-2 py-0.5 text-sm text-white',
                        title && TitleStyle[title as Title]
                    )}
                >
                    {title}
                </p>
                <p className="text-md truncate">{post}</p>
            </div>
        </div>
    );
}
