import React from 'react';
import { getRooms } from '@/api/chat';
import { ChatRoomParam, ChatRoomsPage } from '@/types/chat';

export const useChatRoomData = (params?: ChatRoomParam): ChatRoomsPage | undefined => {
    const [chatRooms, setChatRooms] = React.useState<ChatRoomsPage>();

    React.useEffect(() => {
        const getChatRooms = async () => {
            try {
                const { chatRooms } = await getRooms(params);
                console.log('data : ', chatRooms);
                setChatRooms(chatRooms);
            } catch {}
        };

        getChatRooms();
    }, []);

    return chatRooms;
};
