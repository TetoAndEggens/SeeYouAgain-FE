import axiosInstance from '@/lib/axios';
import { User } from '@/types/auth';
import { ServerResponseType } from '@/types/common';

/**
 * 푸시 알림 설정 요청
 */
export interface PushSettingRequest {
    isPushEnabled: boolean;
}

/**
 * 푸시 알림 설정 조회 응답
 */
export interface PushSettingResponse {
    isPushEnabled: boolean;
}

/**
 * 푸시 알림 설정 업데이트 API
 * @param request - 푸시 알림 ON/OFF 설정
 * @returns 성공 응답
 */
export const updatePushSetting = async (
    request: PushSettingRequest
): Promise<ServerResponseType<Record<string, never>>> => {
    const { data } = await axiosInstance.put('/member/push', request);
    return data;
};

/**
 * 푸시 알림 설정 조회 API
 * @returns 현재 푸시 알림 설정 상태
 */
export const getPushSetting = async (): Promise<ServerResponseType<PushSettingResponse>> => {
    const { data } = await axiosInstance.get('/member/push');
    return data;
};

export const getMemberInfo = async (): Promise<ServerResponseType<User>> => {
    const { data } = await axiosInstance.get('/member/me');
    return data;
};
