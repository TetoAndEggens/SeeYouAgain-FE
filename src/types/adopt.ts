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
    animalType: 'ABANDONED';
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
