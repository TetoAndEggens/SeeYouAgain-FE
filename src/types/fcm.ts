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

// FCM 토큰 목록 조회 응답
export interface FcmTokenListResponse {
    tokens: FcmToken[];
}

// FCM 알림 페이로드
export interface FcmNotificationPayload {
    title: string;
    body: string;
    icon?: string;
    image?: string;
    badge?: string;
    click_action?: string;
}

// FCM 데이터 페이로드
export interface FcmDataPayload {
    [key: string]: string;
}

// FCM 메시지
export interface FcmMessage {
    notification?: FcmNotificationPayload;
    data?: FcmDataPayload;
}
