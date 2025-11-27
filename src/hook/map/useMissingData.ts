export const testMissingData = [
    {
        id: 1,
        cardType: 'missing' as const,
        name: '뽀삐',
        tags: ['말티즈', '흰색', '2살'],
        location: '제주시 노형동',
        date: '2024.11.25',
        image: 'https://placedog.net/500',
        lng: 126.57029601730068,
        lat: 33.452782195539925,
    },
    {
        id: 2,
        cardType: 'sighting' as const,
        name: '코코',
        tags: ['푸들', '갈색', '3살'],
        location: '제주시 연동',
        date: '2024.11.24',
        image: 'https://placedog.net/510',
        lng: 126.57286276149365,
        lat: 33.45028010393749,
    },
    {
        id: 3,
        cardType: 'missing' as const,
        name: '나비',
        tags: ['코숏', '회색', '1살'],
        location: '제주시 이도동',
        date: '2024.11.23',
        image: 'https://placedog.net/600',
        lng: 126.56829601730068,
        lat: 33.454782195539925,
    },
    {
        id: 4,
        cardType: 'sighting' as const,
        name: '초코',
        tags: ['리트리버', '황금색', '5살'],
        location: '제주시 일도동',
        date: '2024.11.22',
        image: 'https://placedog.net/530',
        lng: 126.57486276149365,
        lat: 33.44828010393749,
    },
];

export function useMissingData() {
    return {
        data: testMissingData,
    };
}
