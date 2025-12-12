'use client';

import React, { useRef } from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchProps {
    placeholder?: string;
    onClick?: () => void;
    inputValue?: string;
    setInputValue?: (e: string) => void;
}

export function Search({
    placeholder = '검색창',
    onClick,
    inputValue,
    setInputValue = (e) => {},
}: SearchProps) {
    const [isSearch, setIsSearch] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isSearch) inputRef.current?.focus();
    }, [isSearch]);

    return (
        <div className="flex w-full justify-center py-2">
            <div
                className="bg-gray-30 flex w-[90%] items-center justify-between rounded-lg px-4 py-2 shadow-md"
                onClick={(e) => {
                    console.log('test ');
                }}
            >
                <input
                    type="text"
                    ref={inputRef}
                    placeholder={placeholder}
                    disabled={!isSearch}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <SearchIcon />
            </div>
        </div>
    );
}
