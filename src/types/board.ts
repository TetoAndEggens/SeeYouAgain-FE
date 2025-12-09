import { CursorPageResponse } from './adopt';

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
    animalType: string;
    memberNickname: string;
    profile: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    isBookmarked: boolean;
};

export type BoardDataResponse = {
    data: {
        boardCount: number;
        board: CursorPageResponse<BoardData>;
    };
    status: number;
    message: string;
};
