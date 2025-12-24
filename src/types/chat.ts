const Titles = ['MISSING', 'WITNESS', 'ABANDONED'] as const;
export type Title = (typeof Titles)[number];

// 채팅 조회용 파라미터 타입
export interface CommonParam {
    cursorId?: string | null;
    size?: number;
    sortDirection?: 'LATEST' | 'OLDEST';
}

export type ChatRoomParam = CommonParam;

// 채팅 목록 데이터 타입
export interface ChatRoomData {
    chatRooms: {
        data: [
            {
                chatRoomId: number;
                boardId: number;
                boardTitle: string;
                contentType: string;
                senderId: number;
                receiverId: number;
                otherMemberNickname: string;
                lastMessage: string;
                lastMessageTime: string;
                unreadCount: number;
            },
        ];
        size: number;
        nextCursor: number;
        hasNext: boolean;
        empty: boolean;
    };
}

// 채팅 내역 조회용 파라미터 타입
export interface MessageParam extends CommonParam {
    chatRoomId: number;
}

// 채팅 내역 데이터 타입
export interface Message {
    messages: {
        data: [
            {
                messageId: number;
                senderId: number;
                content: string;
                isRead: boolean;
                createdAt: string;
            },
        ];
        size: 1073741824;
        nextCursor: 9007199254740991;
        hasNext: boolean;
        empty: boolean;
    };
}

// 웹소켓 연결에 사용되는 data type
export interface ChatMessageDto {
    chatRoomId: number;
    boardId: number;
    senderId: number;
    receiverId: number;
    content: string;
    time: string;
}
