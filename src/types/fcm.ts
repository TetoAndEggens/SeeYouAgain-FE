// FCM 디바이스 타입
export type DeviceType = 'WEB' | 'ANDROID' | 'IOS';

// FCM 토큰 등록 요청
export interface FcmTokenRequest {
    token: string;
    deviceId: string;
}

// FCM 토큰 정보
export interface FcmToken {
    id: number;
    deviceId: string;
    deviceType: DeviceType;
    lastUsedAt: string;
    createdAt: string;
}

// FCM 토큰 등록 응답
export interface FcmTokenResponse {
    id: number;
    deviceId: string;
    deviceType: DeviceType;
    lastUsedAt: string;
    createdAt: string;
}
