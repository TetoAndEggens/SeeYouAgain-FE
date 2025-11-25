import React from 'react';

import MissingDetailPage from './MissingDetailPage';

type Props = {
    params: Promise<{ id: number }>;
};

const LostDetailPage = async ({ params }: Props) => {
    const { id } = await params;

    const testData: {
        cardType: 'missing' | 'sighting';
        title: string;
        userName: string;
        tags: string[];
        location: string;
        date: string;
        image: string;
    }[] = [
        {
            cardType: 'missing',
            title: '복돌이',
            userName: '홍길동',
            tags: ['말티즈', '3살', '중성화', '암컷'],
            location: '서울 강남구 역삼동',
            date: '2025-11-01',
            image: 'https://placedog.net/500/280',
        },
        {
            cardType: 'missing',
            title: '초코',
            userName: '홍길동',
            tags: ['푸들', '2살', '갈색', '암컷'],
            location: '서울 마포구 합정동',
            date: '2025-10-28',
            image: 'https://placedog.net/501/281',
        },
        {
            cardType: 'sighting',
            title: '하루',
            userName: '홍길동',
            tags: ['믹스', '목걸이 없음', '겁이 많음'],
            location: '서울 송파구 잠실동',
            date: '2025-11-02',
            image: 'https://placedog.net/502/282',
        },
        {
            cardType: 'missing',
            title: '몽이',
            userName: '홍길동',
            tags: ['시바견', '4살', '수컷', '하네스 착용'],
            location: '경기 성남시 분당구',
            date: '2025-10-20',
            image: 'https://placedog.net/503/283',
        },
        {
            cardType: 'sighting',
            title: '두부',
            userName: '홍길동',
            tags: ['하얀털', '귀가 큰 편', '사람을 잘 따름'],
            location: '서울 용산구 이태원동',
            date: '2025-11-03',
            image: 'https://placedog.net/504/284',
        },
        {
            cardType: 'missing',
            title: '보리',
            userName: '홍길동',
            tags: ['코기', '5살', '수컷', '꼬리 짧음'],
            location: '인천 연수구 송도동',
            date: '2025-09-30',
            image: 'https://placedog.net/505/285',
        },
        {
            cardType: 'sighting',
            title: '라라',
            userName: '홍길동',
            tags: ['검은색 목줄', '소형견', '낯가림 있음'],
            location: '서울 강서구 마곡동',
            date: '2025-11-05',
            image: 'https://placedog.net/506/286',
        },
        {
            cardType: 'missing',
            title: '콩이',
            userName: '홍길동',
            tags: ['치와와', '1살', '암컷', '장난감 좋아함'],
            location: '경기 고양시 일산동구',
            date: '2025-10-10',
            image: 'https://placedog.net/507/287',
        },
        {
            cardType: 'sighting',
            title: '탄이',
            userName: '홍길동',
            tags: ['블랙탄', '중형견', '목에 파란 목줄'],
            location: '서울 동작구 상도동',
            date: '2025-11-04',
            image: 'https://placedog.net/508/288',
        },
        {
            cardType: 'missing',
            title: '미미',
            userName: '홍길동',
            tags: ['말티즈', '7살', '치아 안 좋음', '중성화'],
            location: '부산 해운대구',
            date: '2025-09-15',
            image: 'https://placedog.net/509/289',
        },
    ];

    return <MissingDetailPage data={testData[id]} />;
};

export default LostDetailPage;
