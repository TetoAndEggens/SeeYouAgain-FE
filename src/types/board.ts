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

// board/my-list response type---
export type MyPostParam = {
    cursorId?: number | null;
    size?: number;
    sortDirection?: 'LATEST' | 'OLDEST';
};

export type MyPostData = {
    boardId: number;
    animalType: 'MISSING' | 'WITNESS';
    title: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    tags?: string[];
    profile: string;
};

export type MyPostBoard = {
    boardCount?: number;
    data: MyPostData[];
    size: number;
    nextCursor: number;
    hasNext: boolean;
    empty: boolean;
};

export type MyPostResponseData = {
    boardCount: number;
    board: MyPostBoard;
};
