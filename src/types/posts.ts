export type MyPostsParam = {};

export type MyPostsData = {};

export type MyBookmarkData = {
    bookMarkId: number;
    animalId: number;
    species: string;
    breedType: string;
    processState: string;
};

export type MyBookmarkList = {
    data: MyBookmarkData[];
    status: number;
    message: string;
};
