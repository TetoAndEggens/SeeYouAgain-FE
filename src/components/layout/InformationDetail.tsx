'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InformationDetailProps {
    index: number;
    item: { title: string; context: string };
    className?: string;
    titleClassName?: string;
    contextClassName?: string;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function InformationDetail({
    index,
    item,
    className,
    titleClassName,
    contextClassName,
    containerProps,
}: InformationDetailProps) {
    return (
        <div
            key={index}
            className={cn('bg-gray-20 flex-1 shrink-0 rounded-lg px-2 py-1', className)}
            {...containerProps}
        >
            <p className={cn('text-sm text-gray-800', titleClassName)}>{item.title}</p>
            <p className={cn('truncate text-lg font-bold', contextClassName)}>{item.context}</p>
        </div>
    );
}
