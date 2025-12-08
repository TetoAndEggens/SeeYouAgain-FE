import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { SortByType } from '@/types/common';

interface SortDropdownProps {
    sortBy: SortByType;
    setSortBy: (sort: SortByType) => void;
}

export function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2 py-1 text-[0.75rem]">
                    {sortBy === 'LATEST' ? '최신순' : '오래된 순'}
                    <ChevronDown strokeWidth={1} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSortBy('LATEST')}>
                        최신순
                        {sortBy === 'LATEST' && <Check className="text-accent" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('OLDEST')}>
                        오래된순
                        {sortBy === 'OLDEST' && <Check className="text-accent" />}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
