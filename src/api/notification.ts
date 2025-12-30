import axiosInstance from '@/lib/axios';
import { ServerResponseType } from '@/types/common';
import {
    KeywordBody,
    KeywordResponse,
    KeywordUpdateBody,
    KeywordUpdateResponse,
} from '@/types/notification';

export const postKeyword = async (
    request: KeywordBody
): Promise<ServerResponseType<KeywordResponse>> => {
    const { data } = await axiosInstance.post('notification/keyword', request);
    return data;
};

export const getKeyword = async (): Promise<ServerResponseType<KeywordResponse[]>> => {
    const { data } = await axiosInstance.get('notification/keyword');
    return data;
};

export const putKeyword = async (
    request: KeywordUpdateBody
): Promise<ServerResponseType<KeywordUpdateResponse>> => {
    const { data } = await axiosInstance.put('notification/keyword/updateAll', request);
    return data;
};

export const deleteKeyword = async (id: number): Promise<ServerResponseType<null>> => {
    const { data } = await axiosInstance.delete(`notification/keyword/${id}`);
    return data;
};
