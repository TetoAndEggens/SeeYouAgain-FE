const Titles = ['MISSING', 'WITNESS', 'ABANDONED'] as const;
export type Title = (typeof Titles)[number];

// 채팅 조회용 파라미터 타입
export interface CommonParam {
    cursorId?: number | null;
    size?: number;
    sortDirection?: 'LATEST' | 'OLDEST';
}

export type ChatRoomParam = CommonParam;

export interface ChatData {
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

export interface ChatRoomData {
    data: ChatData[];
    size: number;
    nextCursor: number;
    hasNext: boolean;
    empty: boolean;
}

// 채팅 목록 데이터 타입
export interface ChatRoomResponse {
    chatRooms: ChatRoomData;
}

// 채팅 내역 조회용 파라미터 타입
export interface MessageParam extends CommonParam {
    chatRoomId: number;
}

export interface Message {
    messageId: number;
    senderId: number;
    content: string;
    isRead: boolean;
    createdAt: string;
}

export interface MessageData {
    data: Message[];
    size: number;
    nextCursor: number;
    hasNext: boolean;
    empty: boolean;
}

// 채팅 내역 데이터 타입
export interface MessageResponse {
    messages: MessageData;
}

// 채팅 전송 Dto
export interface ChatSendDto {
    chatRoomId: number;
    content: string;
}

// 웹소켓 연결에 사용되는 data type
export interface ChatMessageDto {
    chatRoomId: number;
    messageId: number;
    senderId: number;
    content: string;
    isRead: boolean;
    createdAt: string;
}

// 읽음 알림 수신
export interface ChatReadReceiveDto {
    messageId: number;
}
