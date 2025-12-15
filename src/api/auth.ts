import axiosInstance from '@/lib/axios';
import {
    LoginRequest,
    PhoneVerifyRequest,
    SignupRequest,
    WithdrawalRequest,
    PhoneVerifyResponse,
} from '@/types/auth';
import { ServerResponseType } from '@/types/common';

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

export const verifySocialPhoneCode = async (
    phone: string
): Promise<ServerResponseType<PhoneVerifyResponse>> => {
    const { data } = await axiosInstance.post('/auth/social/phone/verify-code', { phone: phone });
    return data;
};

export const linkSocialAccount = async () => {
    const { data } = await axiosInstance.post('/auth/social/link');
    return data;
};

export const sendPhoneVerification = async (phone: string) => {
    const { data } = await axiosInstance.post('/auth/phone/send-code', { phone: phone });
    return data;
};

export const verifyPhoneCode = async (phone: string, code: string) => {
    const { data } = await axiosInstance.post('/auth/phone/verify-code', {
        phone: phone,
        code: code,
    });
    return data;
};

export const login = async (request: LoginRequest) => {
    const { data } = await axiosInstance.post('/auth/login', request);
    return data;
};

export const withdrawal = async (request: WithdrawalRequest) => {
    const { data } = await axiosInstance.delete('/auth/withdrawal', {
        data: request,
    });
    return data;
};
