import React from 'react';
import { cn } from '@/lib/utils';

interface FormProps {
    title?: string;
    className?: string;
    important?: boolean;
    children?: React.ReactNode;
    tagChildren?: React.ReactNode;
}

export function Form({ title, className, important, children, tagChildren }: FormProps) {
    return (
        <div className={cn('flex w-full shrink-0 flex-col gap-4 rounded-lg', className)}>
            <p className="text-lg font-bold">
                {title}{' '}
                {important && (
                    <span className="text-destructive align-text-top text-lg">*</span>
                )}{' '}
            </p>
            {children}
            {tagChildren && <div className="overflow-hidden whitespace-nowrap">{tagChildren}</div>}
        </div>
    );
}
