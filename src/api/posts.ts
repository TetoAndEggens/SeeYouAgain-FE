import axiosInstance from '@/lib/axios';

export const fetchMyPosts = async () => {
    const { data } = await axiosInstance.get('');
    return data;
};
