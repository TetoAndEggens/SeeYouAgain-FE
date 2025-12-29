import React from 'react';
import { getUnread } from '@/api/chat';
import { ChatRoomParam, ChatRoomData } from '@/types/chat';

export const useUnread = (param: ChatRoomParam) => {
    const [chatUnread, setChatUnread] = React.useState<ChatRoomData[]>([]);

    React.useEffect(() => {
        const getChatUnread = async () => {
            try {
                const data = await getUnread(param);
                console.log('getChatUnread data : ', data);
                setChatUnread(data);
            } catch {}
        };

        getChatUnread();
    }, []);

    return chatUnread;
};
