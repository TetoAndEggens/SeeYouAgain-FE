import { getMessage } from '@/api/chat';
import { format, formatDistanceToNow } from 'date-fns';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MessageParam, MessageData, MessageResponse, Message } from '@/types/chat';
import { ko } from 'date-fns/locale';

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
                    const day = new Date(m.createdAt);
                    const diff = (now - day.getTime()) / 1000;
                    let time: string;

                    if (diff < 60 * 1) {
                        time = '방금 전';
                    } else if (diff < 60 * 60 * 24) {
                        time = formatDistanceToNow(day, { addSuffix: true, locale: ko });
                    } else {
                        time = format(day, 'MM-dd a h:m', { locale: ko });
                    }

                    return { ...m, createdAt: time };
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
