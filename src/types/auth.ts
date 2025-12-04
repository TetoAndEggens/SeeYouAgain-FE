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
