export interface BoardReportForm {
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
    memberNickname?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
    profiles?: string[];
}
