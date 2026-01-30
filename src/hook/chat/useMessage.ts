import React from 'react';
import { getMessage } from '@/api/chat';
import { MessageParam, MessageData } from '@/types/chat';

export const useMessage = (param: MessageParam) => {
    const [chatMessage, setChatMessage] = React.useState<MessageData | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isError, setIsError] = React.useState<boolean>(false);

    React.useEffect(() => {
        let ignore = false;

        const getChatMessage = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const data = await getMessage(param);
                if (!ignore) {
                    setChatMessage(data.messages);
                }
            } catch {
                if (!ignore) {
                    setIsError(true);
                    setChatMessage(null);
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        getChatMessage();

        return () => {
            ignore = true; // 수정: cleanup
        };
    }, [param.chatRoomId, param.cursorId, param.size, param.sortDirection]);

    return { chatMessage, isLoading, isError };
};
