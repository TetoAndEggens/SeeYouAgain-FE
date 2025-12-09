import axiosInstance from '@/lib/axios';
import { animalFetchParams } from '@/types/adopt';
import { BoardDataResponse } from '@/types/board';

export const fetchBoardList = async (params: animalFetchParams): Promise<BoardDataResponse> => {
    const { data } = await axiosInstance.get('board/list', { params });
    return data;
};
