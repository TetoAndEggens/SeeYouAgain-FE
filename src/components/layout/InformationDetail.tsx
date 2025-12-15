'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InformationDetailProps {
    index?: number;
    item: { title: string; context: string };
    className?: string;
    titleClassName?: string;
    contextClassName?: string;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function InformationDetail({
    item,
    className,
    titleClassName,
    contextClassName,
    containerProps,
}: InformationDetailProps) {
    return (
        <div
            className={cn('bg-gray-20 flex-1 shrink-0 rounded-lg px-4 py-3', className)}
            {...containerProps}
        >
            <p className={cn('text-gray-40 text-sm', titleClassName)}>{item.title}</p>
            <p className={cn('truncate text-lg font-semibold text-gray-50', contextClassName)}>
                {item.context}
            </p>
        </div>
    );
}
