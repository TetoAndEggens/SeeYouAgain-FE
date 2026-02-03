// 파일명: src/hook/chat/useMessage.ts
import { getMessage } from '@/api/chat';
import { MessageParam, MessageData, MessageResponse } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

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
                sortDirection: param.sortDirection ?? 'LATEST',
            }),

        getNextPageParam: (lastPage) => {
            return lastPage.messages.hasNext ? lastPage.messages.nextCursor : undefined;
        },

        select: (data) => {
            const mergedData = data.pages.flatMap((page) => page.messages.data);
            const last = data.pages[data.pages.length - 1]?.messages;
            console.log('useMessage select mergedData : ', mergedData);
            console.log('useMessage select last : ', last);
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
