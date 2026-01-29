import React from 'react';
import { postMyBookMarkData, fetchMyBookMarkList } from '@/api/posts';
import { MyBookmarkData } from '@/types/posts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const usePost = () => {
    const [check, setCheck] = React.useState<boolean>(false);

    const queryClient = useQueryClient();
    const { data: myBookmark } = useQuery({
        queryKey: ['myBookmark'],
        queryFn: fetchMyBookMarkList,
        select: (data) => data.data,
    });

    const isBookmarked = React.useCallback(
        (id: number) => {
            if (!myBookmark) return false;

            const hasBookmark = myBookmark?.data.some(
                (item: MyBookmarkData) => item.animalId === id
            );

            setCheck(hasBookmark);
            return hasBookmark;
        },
        [myBookmark]
    );

    const postBookmark = async (id: number) => {
        const status = await postMyBookMarkData(id);

        if (status === 204) {
            await queryClient.invalidateQueries({ queryKey: ['myBookmark'] });

            const updatedData = queryClient.getQueryData<MyBookmarkData[]>(['myBookmark']);

            const hasBookmark =
                updatedData?.some((item: MyBookmarkData) => item.animalId === id) ?? false;
            setCheck(hasBookmark);
        }
    };

    return {
        check,

        postBookmark,
        isBookmarked,
    };
};
