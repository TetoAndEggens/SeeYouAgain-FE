import { CursorPageResponse } from './common';

export interface AdoptAnimal {
    animalId: number;
    happenDate: string;
    species: 'DOG' | 'CAT';
    breedType: string;
    birth: string;
    city: string;
    town: string;
    latitude: number;
    longitude: number;
    sex: 'M' | 'F' | 'Q';
    processState: string;
    profile: string;
    animalType: 'ABANDONED' | 'MISSING' | 'WITNESS';
    isBookmarked: boolean;
}

export interface AdoptAnimalDetail {
    animalId: number;
    animalType: 'ABANDONED' | 'MISSING' | 'WITNESS';
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
}

export interface AnimalFetchParams {
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
}

export interface AnimalMapFetchparams extends AnimalFetchParams {
    minLongitude: number;
    minLatitude: number;
    maxLongitude: number;
    maxLatitude: number;
    animalType?: 'ABANDONED' | 'MISSING' | 'WITNESS';
}

// 전체 API 응답 래퍼
export interface AdoptAnimalsResponse {
    animalCount: number;
    animal: CursorPageResponse<AdoptAnimal>;
}
