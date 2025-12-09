import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseCoordinates(str: string): [number, number] {
    const numbers = str.match(/[\d.]+/g)?.map(Number) ?? [];
    return [numbers[0], numbers[1]];
}
