import React from 'react';
import { getRooms, getUnread } from '@/api/chat';
import { ChatRoomParam, ChatRoomData } from '@/types/chat';

export const useChatRoomData = (params?: ChatRoomParam): ChatRoomData | undefined => {
    const [chatRooms, setChatRooms] = React.useState<ChatRoomData>();

    React.useEffect(() => {
        let ignore = false;

        const getChatRooms = async () => {
            try {
                const { chatRooms } = await getRooms(params);
                console.log('data : ', chatRooms);
                if (!ignore) setChatRooms(chatRooms);
            } catch (err) {
                console.error(err);
            }
        };

        getChatRooms();

        return () => {
            ignore = true;
        };
    }, [params?.cursorId, params?.size, params?.sortDirection]);

    return chatRooms;
};

export const useUnread = (param?: ChatRoomParam): ChatRoomData | undefined => {
    const [chatUnread, setChatUnread] = React.useState<ChatRoomData>();

    React.useEffect(() => {
        let ignore = false;

        const getChatUnread = async () => {
            try {
                const { chatRooms } = await getUnread(param);
                console.log('getChatUnread data : ', chatRooms);
                if (!ignore) setChatUnread(chatRooms);
            } catch (err) {
                console.error(err);
            }
        };

        getChatUnread();

        return () => {
            ignore = true;
        };
    }, [param?.cursorId, param?.size, param?.sortDirection]);

    return chatUnread;
};
