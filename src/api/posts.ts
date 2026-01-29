import axiosInstance from '@/lib/axios';
import { ServerResponseType } from '@/types/common';
import { MyBookmarkList } from '@/types/posts';

export const fetchMyPosts = async () => {
    const { data } = await axiosInstance.get('');
    return data;
};

export const postMyBookMarkData = async (id: number): Promise<number> => {
    const { status } = await axiosInstance.post(`bookmark/animals/${id}`);
    return status;
};

export const fetchMyBookMarkList = async (): Promise<ServerResponseType<MyBookmarkList>> => {
    const { data } = await axiosInstance.post(`bookmark`);
    return data;
};
