export type AdoptAnimal = {
    animalId: number;
    happenDate: string;
    species: 'DOG' | 'CAT';
    breedType: string;
    birth: string;
    city: string;
    town: string;
    sex: 'M' | 'F' | 'Q';
    processState: string;
    profile: string;
    animalType: string;
    isBookmarked: boolean;
};

export type AdoptAnimalDetail = {
    animalId: number;
    animalType: string;
    happenDate: string;
    species: 'DOG' | 'CAT';
    breedType: string;
    birth: string;
    happenPlace: string;
    sex: 'M' | 'F' | 'Q';
    processState: string;
    profiles: string[];
    color: string;
    noticeNo: string;
    noticeStartDate: string;
    noticeEndDate: string;
    specialMark: string;
    weight: string;
    neuteredState: 'Y' | 'N' | 'U';
    centerName: string;
    centerAddress: string;
    centerPhone: string;
    isBookmarked: boolean;
};

export type animalFetchParams = {
    cursorId?: number | null;
    size?: number;
    sortDirection?: 'LATEST' | 'OLDEST';
    startDate?: string;
    endDate?: string;
    species?: 'DOG' | 'CAT' | 'ETC';
    breedType?: string;
    neuteredState?: 'Y' | 'N' | 'U';
    sex?: 'M' | 'F' | 'Q';
    city?: string;
    town?: string;
};

// 커서 페이징 응답
export type CursorPageResponse<T> = {
    data: T[];
    size: number;
    nextCursor: number | null;
    hasNext: boolean;
    empty: boolean;
};

// 전체 API 응답 래퍼
export type AdoptAnimalsResponse = {
    data: {
        animalCount: number;
        animal: CursorPageResponse<AdoptAnimal>;
    };
    status: number;
    message: string;
};
