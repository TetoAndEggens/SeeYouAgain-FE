import axiosInstance from '@/lib/axios';
import { FcmTokenRequest, FcmTokenResponse, FcmToken } from '@/types/fcm';
import { ServerResponseType } from '@/types/common';

/**
 * FCM 토큰 등록 API
 * @param request - FCM 토큰 및 디바이스 ID
 * @returns 등록된 FCM 토큰 정보
 */
export const registerFcmToken = async (
    request: FcmTokenRequest
): Promise<ServerResponseType<FcmTokenResponse>> => {
    const { data } = await axiosInstance.post('/fcm/tokens', request);
    return data;
};

/**
 * FCM 토큰 목록 조회 API
 * @returns 사용자의 모든 FCM 토큰 목록
 */
export const getFcmTokens = async (): Promise<ServerResponseType<FcmToken[]>> => {
    const { data } = await axiosInstance.get('/fcm/tokens');
    return data;
};

/**
 * FCM 토큰 삭제 API (로그아웃 시)
 * @param deviceId - 삭제할 디바이스 ID
 */
export const deleteFcmToken = async (deviceId: string): Promise<ServerResponseType<void>> => {
    const { data } = await axiosInstance.delete(`/fcm/tokens/${deviceId}`);
    return data;
};

/**
 * FCM 토큰 갱신 API (30일 경과 시)
 * @param deviceId - 갱신할 디바이스 ID
 */
export const refreshFcmToken = async (deviceId: string): Promise<ServerResponseType<void>> => {
    const { data } = await axiosInstance.put(`/fcm/tokens/${deviceId}/refresh`);
    return data;
};
