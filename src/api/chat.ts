import axiosInstance from '@/lib/axios';
import { ChatRoomParam, ChatRoomResponse, MessageParam, MessageResponse } from '@/types/chat';

export const getRooms = async (
    params: ChatRoomParam = { cursorId: null, size: 10, sortDirection: 'OLDEST' }
): Promise<ChatRoomResponse> => {
    const { data } = await axiosInstance.get('chat/rooms', { params });
    console.log('getRooms : ', data);
    return data;
};

export const createRooms = async (boardId: number): Promise<number> => {
    const { data } = await axiosInstance.post('chat/rooms', { boardId }); // API 명세의 request body 스키마({ boardId })에 맞게 전송하도록 수정했습니다.
    console.log('createRooms : ', data);
    return data;
};

export const getMessage = async (params: MessageParam): Promise<MessageResponse> => {
    const { data } = await axiosInstance.get(`chat/rooms/${params.chatRoomId}/messages`, {
        params,
    });
    console.log('getMessage : ', data);
    return data;
};

export const getUnread = async (
    params: ChatRoomParam = { cursorId: null, size: 10, sortDirection: 'OLDEST' }
): Promise<ChatRoomResponse> => {
    const { data } = await axiosInstance.get('chat/rooms/unread', { params });
    console.log('getUnread : ', data);
    return data;
};
