const Titles = ['실종', '보호', '목격', '기타'] as const;
export type Title = (typeof Titles)[number];

export interface CommonParam {
    cursorId?: string | null;
    size?: number;
    sortDirection?: 'LATEST' | 'OLDEST';
}

export type ChatRoomParam = CommonParam;

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

export interface MessageParam extends CommonParam {
    chatRoomId: number;
}

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
