export type SortByType = 'LATEST' | 'OLDEST';

export type AnimalTypeType = 'MISSING' | 'WITNESS' | 'default';

export type ServerResponseType<T> = {
    data: T;
    status: number;
    message: string;
};

// 커서 페이징 응답
export type CursorPageResponse<T> = {
    data: T[];
    size: number;
    nextCursor: number | null;
    hasNext: boolean;
    empty: boolean;
};
