import react from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TagProps {
    index: number;
    item: string;
}

export function Tag({ index, item }: TagProps) {
    return (
        <div>
            <span
                key={index}
                className="m-1 inline-block rounded-full bg-[#FFE0B2] px-3 py-1 text-sm font-semibold text-[#FF8F00]"
            >
                #{item}
            </span>
            <X />
        </div>
    );
}
