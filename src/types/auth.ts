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
