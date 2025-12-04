export interface CoordType {
    lng: number;
    lat: number;
}

export interface MapBounds {
    sw: string;
    ne: string;
}

export interface MissingData {
    id: number;
    cardType: 'missing' | 'sighting';
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
        cardType: 'missing' | 'sighting';
        title: string;
        userName: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    };
}
