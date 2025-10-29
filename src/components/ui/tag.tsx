import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
    'inline-flex items-center rounded-full px-2 py-1', // 기본 스타일
    {
        variants: {
            variant: {
                default: 'bg-primary-light text-primary-foreground',
                missing: 'bg-destructive-light text-destructive',
                find: 'bg-accent-light text-accent',
            },
            size: {
                sm: 'text-[0.75rem]',
                lg: 'text-[1rem]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'sm',
        },
    }
);
interface TagProps {
    children: string;
    className?: string;
    size?: 'sm' | 'lg';
    variant?: 'default' | 'missing' | 'find';
}

function Tag({ children, className, size, variant }: TagProps) {
    return <div className={cn(tagVariants({ variant, size, className }))}>{children}</div>;
}

export default Tag;
