import React from 'react';
import { getRooms, getUnread } from '@/api/chat';
import { ChatRoomParam, ChatRoomResponse, ChatRoomData, ChatData } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useChatRoomData = (params: ChatRoomParam) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery<
            ChatRoomResponse,
            Error,
            ChatRoomData,
            (string | number | undefined)[],
            number | null
        >({
            queryKey: ['chatRoomData', params?.sortDirection, params?.size],
            queryFn: ({ pageParam = null }) =>
                getRooms({
                    cursorId: pageParam,
                    size: params?.size ?? 10,
                    sortDirection: params?.sortDirection ?? 'OLDEST',
                }),
            getNextPageParam: (lastPage) => {
                return lastPage.chatRooms.hasNext ? lastPage.chatRooms.nextCursor : undefined;
            },
            select: (data) => {
                const mergedData = data.pages.flatMap((page) => page.chatRooms.data);
                const last = data.pages[data.pages.length - 1]?.chatRooms;

                return {
                    data: mergedData,
                    size: last?.size ?? params?.size ?? 10,
                    nextCursor: last?.nextCursor ?? 0,
                    hasNext: last?.hasNext ?? false,
                    empty: mergedData.length === 0,
                };
            },
            initialPageParam: null,
        });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError };
};

export const useUnreadRoomData = (params: ChatRoomParam) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery<
            ChatRoomResponse,
            Error,
            ChatRoomData,
            (string | number | undefined)[],
            number | null
        >({
            queryKey: ['chatUnreadRoomData', params?.sortDirection, params?.size],
            queryFn: ({ pageParam = null }) =>
                getUnread({
                    cursorId: pageParam,
                    size: params?.size ?? 10,
                    sortDirection: params?.sortDirection ?? 'OLDEST',
                }),
            getNextPageParam: (lastPage) => {
                return lastPage.chatRooms.hasNext ? lastPage.chatRooms.nextCursor : undefined;
            },
            select: (data) => {
                const mergedData = data.pages.flatMap((page) => page.chatRooms.data);
                const last = data.pages[data.pages.length - 1]?.chatRooms;

                return {
                    data: mergedData,
                    size: last?.size ?? params?.size ?? 10,
                    nextCursor: last?.nextCursor ?? 0,
                    hasNext: last?.hasNext ?? false,
                    empty: mergedData.length === 0,
                };
            },
            initialPageParam: null,
        });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError };
};
