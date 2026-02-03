import axiosInstance from '@/lib/axios';
import { AnimalFetchParams } from '@/types/animal';
import {
    BoardDataResponse,
    BoardFormResponse,
    BoardDetailData,
    MyPostParam,
    MyPostResponseData,
} from '@/types/board';
import { BoardForm } from '@/types/board';
import { ServerResponseType } from '@/types/common';

export const fetchBoardList = async (
    params: AnimalFetchParams
): Promise<ServerResponseType<BoardDataResponse>> => {
    const { data } = await axiosInstance.get('board/list', { params });
    return data;
};

export const fetchBoardById = async (id: number): Promise<ServerResponseType<BoardDetailData>> => {
    const { data } = await axiosInstance.get(`board/${id}`);
    return data;
};

export const postBoard = async (
    request: BoardForm
): Promise<ServerResponseType<BoardFormResponse>> => {
    const { data } = await axiosInstance.post('board', request);
    return data;
};

export const fetchMyPosts = async (params: MyPostParam): Promise<MyPostResponseData> => {
    const { data } = await axiosInstance.get('board/my-list', { params });
    return data;
};
