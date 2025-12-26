import React from 'react';
import { getRooms } from '@/api/chat';
import { ChatRoomParam, ChatRoomData } from '@/types/chat';

export const useChatRoomData = (params?: ChatRoomParam) => {
    const [chatRooms, setChatRooms] = React.useState<ChatRoomData[]>([]);

    React.useEffect(() => {
        const getChatRooms = async () => {
            try {
                const data = await getRooms(params);
                console.log('data : ', data);
                setChatRooms(data);
            } catch {}
        };

        getChatRooms();
    }, []);

    return chatRooms;
};
