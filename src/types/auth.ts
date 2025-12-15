export interface SignupRequest {
    loginId: string;
    password: string;
    nickName: string;
    phoneNumber: string;
    tempUuid?: string;
}

export interface PhoneVerifyRequest {
    phone: string;
    tempUuid?: string;
}

export interface LoginRequest {
    loginId: string;
    password: string;
}

export interface WithdrawalRequest {
    password: string;
    reason: string;
}

export interface PhoneVerifyResponse {
    status: 'LINK' | 'LOGIN' | 'SUCCESS';
    message: string | null;
    loginResponse: {
        uuid: string;
        role: string;
    } | null;
}
