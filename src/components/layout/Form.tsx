import React from 'react';
import { cn } from '@/lib/utils';

interface FormProps {
    title?: string;
    className?: string;
    importent?: boolean;

    children?: React.ReactNode;
    tagChildren?: React.ReactNode;
}

export function Form({ title, className, importent, children, tagChildren }: FormProps) {
    return (
        <div
            className={cn(
                'flex w-full shrink-0 flex-col gap-2 rounded-lg border border-gray-300 px-2',
                className
            )}
        >
            <p className="text-lg font-bold">
                {title}{' '}
                {importent && <span className="align-text-top text-lg text-red-600">*</span>}{' '}
            </p>
            {children}
            <div className="overflow-hidden whitespace-nowrap">{tagChildren}</div>
        </div>
    );
}
