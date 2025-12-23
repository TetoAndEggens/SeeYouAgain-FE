export interface KeywordResponse extends KeywordBody {
    id: number;
}

export interface KeywordUpdateBody {
    keywordToAdd: KeywordBody[];
    keywordIdsToDelete: number[];
    empty: boolean;
}

export interface KeywordUpdateResponse {
    addedKeywords: KeywordResponse[];
    deletedKeywordIds: number[];
    addedCount: number;
    deletedCount: number;
    message: string;
}

export interface KeywordBody {
    keyword: string;
    keywordType: 'ABANDONED' | 'WITNESS';
    keywordCategoryType: 'BREED' | 'LOCATION';
}
