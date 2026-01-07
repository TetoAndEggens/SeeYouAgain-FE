const Titles = ['MISSING', 'WITNESS', 'ABANDONED'] as const;
export type Title = (typeof Titles)[number];

export interface CommonParam {
    cursorId?: string | null;
    size?: number;
    sortDirection?: 'LATEST' | 'OLDEST';
}

export type ChatRoomParam = CommonParam;

export interface ChatRoomItem {
    chatRoomId: number;
    boardId: number;
    boardTitle: string;
    contentType: Title;
    senderId: number;
    receiverId: number;
    otherMemberNickname: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export interface ChatRoomsPage {
    data: ChatRoomItem[];
    size: number;
    nextCursor: number | null;
    hasNext: boolean;
    empty: boolean;
}

export interface ChatRoomData {
    chatRooms: ChatRoomsPage;
}

export interface MessageParam extends CommonParam {
    chatRoomId: number;
}

export interface MessageItem {
    messageId: number;
    senderId: number;
    content: string;
    isRead: boolean;
    createdAt: string;
}

export interface MessagesPage {
    data: MessageItem[];
    size: number;
    nextCursor: number | null;
    hasNext: boolean;
    empty: boolean;
}

export interface Message {
    messages: MessagesPage;
}
