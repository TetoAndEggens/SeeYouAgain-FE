import { CursorPageResponse } from './common';

export type BoardData = {
    boardId: number;
    title: string;
    species: 'DOG' | 'CAT' | 'ETC';
    breedType: string;
    sex: 'M' | 'F' | 'Q';
    neuteredState: 'Y' | 'N';
    address: string;
    city: string;
    town: string;
    latitude: number;
    longitude: number;
    animalType: 'MISSING' | 'WITNESS';
    memberNickname: string;
    profile: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    isBookmarked: boolean;
};

export type BoardDetailData = {
    boardId: number;
    title: string;
    content: string;
    species: 'DOG' | 'CAT' | 'ETC';
    breedType: string;
    sex: 'M' | 'F' | 'Q';
    neuteredState: 'Y' | 'N';
    color: string;
    address: string;
    city: string;
    town: string;
    latitude: number;
    longitude: number;
    animalType: 'MISSING' | 'WITNESS';
    memberNickname: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    profiles: string[];
    isBookmarked: boolean;
};

export type BoardForm = {
    title: string;
    content: string;
    species?: 'DOG' | 'CAT' | 'ETC';
    breedType: string;
    sex: 'M' | 'F' | 'Q';
    neuteredState: 'Y' | 'N';
    color: string;
    address?: string;
    city?: string;
    town?: string;
    latitude: number;
    longitude: number;
    animalType: string;
    tags?: string[];
    isPhotoUploaded: boolean;
    count: number;
};

export type BoardFormResponse = {
    presignedUrls: string[];
};

export type BoardDataResponse = {
    boardCount: number;
    board: CursorPageResponse<BoardData>;
};
