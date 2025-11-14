import React from 'react';
import { cn } from '@/lib/utils';

interface FormProps {
    title?: String;
    className?: string;

    elementChildren?: React.ReactNode;
    tagChildren?: React.ReactNode;
}

export function Form({ title, className, elementChildren, tagChildren }: FormProps) {
    return (
        <div
            className={cn('mb-5 w-full shrink-0 rounded-lg border border-gray-300 p-2', className)}
        >
            <p className="text-lg font-bold">{title}</p>
            {elementChildren}
            <div className="overflow-hidden pt-2 whitespace-nowrap">{tagChildren}</div>
        </div>
    );
}
