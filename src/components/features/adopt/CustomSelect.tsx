import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Option<T extends string = string> {
    label: string;
    value: T;
}

interface CustomSelectProps<T extends string = string> {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    className?: string;
}

export function CustomSelect<T extends string = string>({
    options,
    value,
    onChange,
    placeholder,
    className = 'w-[100px] px-2 py-1 text-[0.75rem]',
}: CustomSelectProps<T>) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options &&
                    options.map((option) => (
                        <SelectItem value={option.value}>{option.label}</SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
