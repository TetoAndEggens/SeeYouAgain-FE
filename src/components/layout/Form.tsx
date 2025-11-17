import React from 'react';
import { cn } from '@/lib/utils';

interface FormProps {
    title?: string;
    className?: string;

    children?: React.ReactNode;
    tagChildren?: React.ReactNode;
}

export function Form({ title, className, children, tagChildren }: FormProps) {
    return (
        <div className={cn('mb-5 w-full shrink-0 rounded-lg', className)}>
            <p className="mb-4 text-[1.25rem] font-bold">{title}</p>
            {children}
            <div className="overflow-hidden whitespace-nowrap">{tagChildren}</div>
        </div>
    );
}
