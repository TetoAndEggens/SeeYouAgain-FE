'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface CustomPopoverProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data?: string | undefined;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function CustomPopover({
    open,
    setOpen,
    data,
    icon,
    children,
    className,
}: CustomPopoverProps) {
    return (
        <div className={cn('w-full', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {data ? data : 'Select data'}
                        {icon && icon}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-12 w-auto overflow-hidden p-0" align="start">
                    {children}
                </PopoverContent>
            </Popover>
        </div>
    );
}
