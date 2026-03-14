'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectorProps {
    options?: { items: { value: string; name: string }[]; label?: string }[];
    placeholder?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    slotClassName?: {
        trigger?: string;
        content?: string;
        item?: string;
    };
}

export default function CustomSelect({
    options,
    placeholder,
    defaultValue,
    onValueChange,
    className,
    slotClassName,
}: SelectorProps) {
    return (
        <div className={cn('w-full', className)}>
            <Select onValueChange={onValueChange} defaultValue={defaultValue}>
                <SelectTrigger className={cn('w-full', slotClassName?.trigger)}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className={slotClassName?.content}>
                    {options?.map((group, index) => {
                        return (
                            <SelectGroup key={index}>
                                <SelectLabel>{group.label}</SelectLabel>
                                {group.items.map((item, itmeIndex) => (
                                    <SelectItem
                                        key={itmeIndex}
                                        value={item.value}
                                        className={slotClassName?.item}
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
