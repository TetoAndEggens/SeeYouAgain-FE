'use client';

import React from 'react';
import { Avatar } from './Avatar';

interface ChatMessageProps {
    message: string;
    time: string;
    mine: boolean;

    onAvatarClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ChatMessage({ message, time, mine, onAvatarClick }: ChatMessageProps) {
    return mine ? (
        <div className="m-2 ml-auto flex w-fit gap-2.5 p-2">
            <div className="flex flex-col items-end gap-1">
                <div className="relative inline-block max-w-sm rounded-xl bg-[#FFB84D] px-2.5 py-3 text-base text-white">
                    {message}
                </div>
                <div className="">{time}</div>
            </div>
            <Avatar
                onClick={(e) => {
                    e.stopPropagation();
                    onAvatarClick?.(e);
                }}
            />
        </div>
    ) : (
        <div className="m-2 mr-auto flex w-fit gap-2.5 p-2">
            <Avatar
                onClick={(e) => {
                    e.stopPropagation();
                    onAvatarClick?.(e);
                }}
            />
            <div className="flex flex-col items-start gap-1">
                <div className="border-gray-20 relative inline-block max-w-sm rounded-xl border bg-white px-2.5 py-3 text-base">
                    {message}
                </div>
                <div className="">{time}</div>
            </div>
        </div>
    );
}
