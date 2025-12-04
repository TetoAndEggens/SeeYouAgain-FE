import axiosInstance from '@/lib/axios';
import { SignupRequest } from '@/types/auth';

export const fetchSocialTempInfo = async () => {
    const { data } = await axiosInstance.get('/auth/social/temp-info');
    return data;
};

export const signup = async (request: SignupRequest) => {
    const { data } = await axiosInstance.post('/auth/signup', request);
    return data;
};
