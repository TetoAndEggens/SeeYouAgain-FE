import react from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
    index: number;
    item: String;
}

export function Tag({ index, item }: TagProps) {
    return (
        <span
            key={index}
            className="m-1 inline-block rounded-full bg-[#FFE0B2] px-3 py-1 text-sm font-semibold text-[#FF8F00]"
        >
            #{item}
        </span>
    );
}
