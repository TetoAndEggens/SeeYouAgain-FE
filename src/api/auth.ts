import axiosInstance from '@/lib/axios';
import { PhoneVerifyRequest, SignupRequest } from '@/types/auth';

export const fetchSocialTempInfo = async () => {
    const { data } = await axiosInstance.get('/auth/social/temp-info');
    return data;
};

export const signup = async (request: SignupRequest) => {
    const { data } = await axiosInstance.post('/auth/signup', request);
    return data;
};

export const checkLoginId = async (loginId: string) => {
    const { data } = await axiosInstance.post('/auth/check/loginId', { loginId: loginId });
    return data;
};

export const sendSocialPhoneVerification = async (request: PhoneVerifyRequest) => {
    const { data } = await axiosInstance.post('/auth/social/phone/send-code', request);
    return data;
};

export const verifySocialPhoneCode = async (phone: string) => {
    const { data } = await axiosInstance.post('/auth/social/phone/verify-code', { phone: phone });
    return data;
};

export const sendPhoneVerification = async (phone: string) => {
    const { data } = await axiosInstance.post('/auth/phone/send-code', { phone: phone });
    return data;
};

export const verifyPhoneCode = async (phone: string, code: string) => {
    const { data } = await axiosInstance.post('/auth/phone/verify-code', { phone: phone, code: code });
    return data;
};
