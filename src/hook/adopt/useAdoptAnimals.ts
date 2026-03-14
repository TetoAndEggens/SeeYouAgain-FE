import { AdoptAnimal, AdoptAnimalsResponse } from '@/types/animal';
import { ServerResponseType, SortByType } from '@/types/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAdoptAnimals } from '@/api/animal';

export const useAdoptAnimals = (sortBy: SortByType) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
        ServerResponseType<AdoptAnimalsResponse>, // TQueryFnData: queryFn 반환 타입
        Error, // TError: 에러 타입
        { animals: AdoptAnimal[]; totalCount: number }, // TData: select 반환 타입
        string[], // TQueryKey: queryKey 타입
        number | null // TPageParam: pageParam 타입
    >({
        queryKey: ['adoptAnimals', sortBy],
        queryFn: ({ pageParam = null }) =>
            fetchAdoptAnimals({
                cursorId: pageParam,
                size: 20,
                sortDirection: sortBy,
            }),
        getNextPageParam: (lastPage) => {
            return lastPage.data.animal.hasNext ? lastPage.data.animal.nextCursor : undefined;
        },
        select: (data) => ({
            animals: data.pages.flatMap((page) => page.data.animal.data),
            totalCount: data.pages[0]?.data.animalCount ?? 0,
        }),
        initialPageParam: null,
    });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};
