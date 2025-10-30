'use client';
import { Search } from 'lucide-react';
import React from 'react';

interface SearchInputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ placeholder, value, onChange, ...props }: SearchInputProps) {
    return (
        <div className="relative bg-gray-20 text-gray-40 py-2 px-4 flex gap-4">
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
                className="flex-1 focus:outline-none"
            />
            <Search />
        </div>
    );
}

export default SearchInput;
