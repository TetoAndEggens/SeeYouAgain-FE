import React from 'react';
import { getMessage } from '@/api/chat';
import { MessageParam, MessagesPage } from '@/types/chat';

export const useMessage = (param: MessageParam) => {
    const [chatMessage, setChatMessage] = React.useState<MessagesPage>();

    React.useEffect(() => {
        const getChatMessage = async () => {
            try {
                const data = await getMessage(param);
                console.log('getChatMessage data : ', data);
                setChatMessage(data.messages);
            } catch {}
        };

        getChatMessage();
    }, []);

    return chatMessage;
};
