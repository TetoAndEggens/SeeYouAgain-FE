import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseCoordinates(str: string): [number, number] {
    const numbers = str.match(/[\d.]+/g)?.map(Number) ?? [];
    return [numbers[0], numbers[1]];
}

/**
 * ISO 8601 날짜 문자열을 상대적인 시간 표시로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2024-01-01T00:00:00")
 * @returns 24시간 이내면 "n시간 전", 24시간 이상이면 "YYYY.MM.DD" 형식
 *
 * @example
 * formatRelativeTime("2024-01-01T10:00:00") // 1시간 전이면 "1시간 전"
 * formatRelativeTime("2024-01-01T00:00:00") // 2일 전이면 "2024.01.01"
 */
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    // 24시간 이내
    if (diffHours < 24) {
        if (diffMinutes < 1) {
            return '방금 전';
        } else if (diffMinutes < 60) {
            return `${diffMinutes}분 전`;
        } else {
            return `${diffHours}시간 전`;
        }
    }

    // 24시간 이상: 날짜 표시
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}
