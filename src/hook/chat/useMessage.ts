import { getMessage } from '@/api/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MessageParam, MessageData, MessageResponse, Message } from '@/types/chat';
import { formatChatTime } from '@/lib/utils';

export const useMessage = (param: MessageParam) => {
    const {
        data: chatMessage,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery<
        MessageResponse,
        Error,
        MessageData,
        (string | number | undefined)[],
        number | null
    >({
        queryKey: ['chatMessage', param.chatRoomId, param.sortDirection, param.size],

        queryFn: ({ pageParam = null }) =>
            getMessage({
                chatRoomId: param.chatRoomId,
                cursorId: pageParam,
                size: param.size ?? 20,
                sortDirection: param.sortDirection ?? 'OLDEST',
            }),

        getNextPageParam: (lastPage) => {
            return lastPage.messages.hasNext ? lastPage.messages.nextCursor : undefined;
        },

        select: (data) => {
            const now = Date.now();
            const mergedData = data.pages.flatMap((page) => {
                const message = page.messages.data;
                let temp: Message[] = [];

                temp = message.map((m) => {
                    return { ...m, createdAt: formatChatTime(m.createdAt) };
                });

                return temp;
            });
            const last = data.pages[data.pages.length - 1]?.messages;

            return {
                data: mergedData,
                size: last?.size ?? param.size ?? 20,
                nextCursor: last?.nextCursor ?? 0,
                hasNext: last?.hasNext ?? false,
                empty: mergedData.length === 0,
            };
        },

        initialPageParam: null,
    });

    return { chatMessage, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError };
};
