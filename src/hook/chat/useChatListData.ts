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

export const chatDetailData: {
    date: string;
    content: {
        id: number;
        isMe: boolean;
        message: string;
        time: string;
        isRead: boolean;
    }[];
}[] = [
    {
        date: '2025년 12월 3일 수요일',
        content: [
            {
                id: 1,
                isMe: false,
                message: '안녕하세요! 게시글 보고 연락드렸습니다.',
                time: '14:14',
                isRead: true,
            },
            {
                id: 2,
                isMe: false,
                message: '방금 강남역 근처에서 비슷한 강아지를 봤어요.',
                time: '14:14',
                isRead: true,
            },
            {
                id: 3,
                isMe: true,
                message: '정말요? 제보해 주셔서 너무 감사합니다!',
                time: '14:15',
                isRead: true,
            },
            {
                id: 4,
                isMe: true,
                message: '혹시 본 위치랑 시간 조금 더 자세히 알려주실 수 있을까요?',
                time: '14:15',
                isRead: true,
            },
            {
                id: 5,
                isMe: false,
                message: '강남역 5번 출구 근처였어요. 시간은 정확히 2시쯤이었습니다.',
                time: '14:16',
                isRead: true,
            },
            {
                id: 6,
                isMe: true,
                message: '알려주셔서 감사합니다. 근처부터 다시 한 번 찾아볼게요.',
                time: '14:17',
                isRead: true,
            },
            {
                id: 7,
                isMe: false,
                message: '도움이 되었으면 좋겠네요. 찾으시길 정말 바랄게요.',
                time: '14:18',
                isRead: true,
            },
            {
                id: 8,
                isMe: true,
                message: '혹시 이후에라도 비슷한 강아지 보시면 한 번만 더 연락 부탁드려도 될까요?',
                time: '20:32',
                isRead: true,
            },
            {
                id: 9,
                isMe: false,
                message: '네, 당연하죠. 또 보게 되면 바로 알려드릴게요.',
                time: '20:33',
                isRead: true,
            },
        ],
    },
    {
        date: '2025년 12월 4일 목요일',
        content: [
            {
                id: 10,
                isMe: false,
                message: '오늘도 강남역 근처 지나가면서 한 번 더 둘러봤는데, 아직은 못 봤어요.',
                time: '13:05',
                isRead: false,
            },
            {
                id: 11,
                isMe: false,
                message: '혹시 강아지 특징 중에 더 눈에 띄는 게 있을까요?',
                time: '13:05',
                isRead: false,
            },
            {
                id: 12,
                isMe: true,
                message:
                    '노란 리드줄이랑 파란색 목줄을 하고 있어요. 꼬리가 긴 편이고 사람을 잘 따라와요.',
                time: '13:08',
                isRead: false,
            },
            {
                id: 13,
                isMe: true,
                message: '계속 신경 써 주셔서 정말 감사합니다.',
                time: '13:08',
                isRead: false,
            },
        ],
    },
    {
        date: '2025년 12월 5일 금요일',
        content: [
            {
                id: 14,
                isMe: false,
                message:
                    '어제 말씀해주신 특징이랑 조금 비슷한 강아지를 또 보긴 했는데, 확신은 잘 안 들었어요.',
                time: '09:12',
                isRead: false,
            },
            {
                id: 15,
                isMe: false,
                message: '혹시 사진이 있으면 보내주실 수 있을까요? 비교해 보려고요.',
                time: '09:12',
                isRead: false,
            },
            {
                id: 16,
                isMe: true,
                message: '네, 잠시만요. 지금 가지고 있는 사진 정리해서 보내드릴게요.',
                time: '09:13',
                isRead: false,
            },
            {
                id: 17,
                isMe: true,
                message:
                    '정말 계속 신경 써 주셔서 감사하고, 좋은 소식 생기면 저도 바로 알려드릴게요.',
                time: '09:14',
                isRead: false,
            },
        ],
    },
];
export function useChatListData() {
    return {
        data: chatListData,
    };
}

export function useChatDetailData() {
    return {
        data: chatDetailData,
    };
}
