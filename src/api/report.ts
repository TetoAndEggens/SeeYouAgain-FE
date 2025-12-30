import axiosInstance from '@/lib/axios';
import { ServerResponseType } from '@/types/common';
import { ViolationData } from '@/types/report';

export const postViolation = async (request: ViolationData): Promise<ServerResponseType<null>> => {
    const { data } = await axiosInstance.post('violation', request);
    return data;
};
