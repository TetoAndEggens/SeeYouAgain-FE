'use client';
import React from 'react';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    size?: number;
    showStatus?: boolean;
    className?: string;
}

export function Avatar({
    src,
    alt,
    size = 40,
    showStatus = false,
    className,
    ...rest
}: BadgeAvatarProps) {
    return (
        <div
            className={cn('relative inline-block rounded-full bg-neutral-200', className)}
            style={{ width: size, height: size }}
            aria-label={alt}
            {...rest}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full rounded-full object-cover"
                    draggable={false}
                    data-part="profile"
                />
            ) : (
                <UserRound
                    className="h-full w-full rounded-full object-cover"
                    data-part="profile"
                />
            )}
            {showStatus ? (
                <span
                    className="absolute right-0 bottom-0 block rounded-full ring-2 ring-white"
                    style={{ width: size * 0.22, height: size * 0.22, backgroundColor: '#22c55e' }}
                />
            ) : null}
        </div>
    );
}
