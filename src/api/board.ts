import axiosInstance from '@/lib/axios';
import { animalFetchParams } from '@/types/animal';
import { BoardDataResponse, BoardFormResponse } from '@/types/board';
import { BoardForm } from '@/types/board';
import { ServerResponseType } from '@/types/common';

export const fetchBoardList = async (
    params: animalFetchParams
): Promise<ServerResponseType<BoardDataResponse>> => {
    const { data } = await axiosInstance.get('board/list', { params });
    return data;
};

export const postBoard = async (
    request: BoardForm
): Promise<ServerResponseType<BoardFormResponse>> => {
    const { data } = await axiosInstance.post('board', request);
    return data;
};
