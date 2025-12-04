const Titles = ['실종', '보호', '목격', '기타'] as const;
export type Title = (typeof Titles)[number];

export const chatListData: {
    id: number;
    avatar: string;
    userName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    title: Title;
    post?: string;
}[] = [
    {
        id: 1,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        userName: '김유신',
        lastMessage: '오늘 일정 괜찮으세요?',
        lastMessageTime: '09:15',
        unreadCount: 0,
        title: '실종',
        post: '어제 저녁 산책 중에 갑자기 사라졌습니다.',
    },
    {
        id: 2,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        userName: '이순신',
        lastMessage: '사진 한 번만 더 보내 주실 수 있을까요?',
        lastMessageTime: '08:47',
        unreadCount: 2,
        title: '보호',
        post: '집 앞 공원 근처에서 발견해서 임시 보호 중입니다.',
    },
    {
        id: 3,
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        userName: '홍길동',
        lastMessage: '주인이 맞는지 확인할 수 있는 정보가 있을까요?',
        lastMessageTime: '어제',
        unreadCount: 1,
        title: '보호',
        post: '목걸이에 이름표가 없어서 주인을 찾고 있습니다.',
    },
    {
        id: 4,
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
        userName: '신사임당',
        lastMessage: '어디에서 마지막으로 보셨는지 알려주세요.',
        lastMessageTime: '어제',
        unreadCount: 0,
        title: '목격',
        post: '지하철역 근처에서 흰색 강아지를 본 것 같습니다.',
    },
    {
        id: 5,
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
        userName: '강감찬',
        lastMessage: '전단지는 제가 만들어서 공유드릴게요.',
        lastMessageTime: '일요일',
        unreadCount: 3,
        title: '실종',
        post: '집 근처에서 나간 뒤로 소식이 없습니다.',
    },
    {
        id: 6,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        userName: '유관순',
        lastMessage: '보호소에는 아직 연락 안 해보셨나요?',
        lastMessageTime: '일요일',
        unreadCount: 0,
        title: '기타',
        post: '입양 절차에 대해 궁금한 점을 여쭤보고 싶습니다.',
    },
    {
        id: 7,
        avatar: 'https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg',
        userName: '세종대왕',
        lastMessage: '위치 공유해 주시면 바로 가보겠습니다.',
        lastMessageTime: '토요일',
        unreadCount: 5,
        title: '목격',
        post: '차도 근처에서 위험하게 돌아다니고 있었습니다.',
    },
    {
        id: 8,
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
        userName: '장보고',
        lastMessage: '내일 저녁에도 시간 괜찮으신가요?',
        lastMessageTime: '금요일',
        unreadCount: 0,
        title: '기타',
        post: '지역 봉사 모임 일정 논의 중입니다.',
    },
    {
        id: 9,
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
        userName: '안중근',
        lastMessage: '동네 커뮤니티에도 같이 올려보겠습니다.',
        lastMessageTime: '금요일',
        unreadCount: 4,
        title: '실종',
        post: '나이가 많아서 멀리 가지는 못했을 것 같습니다.',
    },
    {
        id: 10,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        userName: '정약용',
        lastMessage: '사진 보니까 예전에 본 아이랑 비슷하네요.',
        lastMessageTime: '목요일',
        unreadCount: 0,
        title: '목격',
        post: '강가 산책로 쪽에서 비슷한 아이를 본 기억이 있습니다.',
    },
];

export function useChatListData() {
    return {
        data: chatListData,
    };
}
