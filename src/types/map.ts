export interface CoordType {
    lng: number;
    lat: number;
}

export interface MapBounds {
    sw: number[];
    ne: number[];
}

export interface MissingData {
    id: number;
    cardType: 'missing' | 'witness';
    name: string;
    tags: string[];
    location: string;
    date: string;
    image: string;
    lng: number;
    lat: number;
}

export interface MissingDetailData {
    data: {
        cardType: 'missing' | 'witness';
        title: string;
        userName: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    };
}
