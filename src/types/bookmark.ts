// export type MyPostsParam = {};

export type MyPostsData = {
    cardType: 'missing' | 'sighting';
    name: string;
    tags: string[];
    location: string;
    date: string;
    image: string;
};

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
