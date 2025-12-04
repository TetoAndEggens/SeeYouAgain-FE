'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import PasswordInput from '@/components/ui/passwordInput';
import { SignupRequest } from '@/types/auth';
import { fetchSocialTempInfo } from '@/api/auth';
import { useSignupValidation } from '@/hook/auth/useSignupValidation';

const SignupPage = () => {
    const {
        errors,
        validateLoginId,
        validatePassword,
        validatePasswordConfirm,
        validateNickName,
        validatePhoneNumber,
    } = useSignupValidation();

    const [formData, setFormData] = useState<SignupRequest>({
        loginId: '',
        password: '',
        nickName: '',
        phoneNumber: '',
    });

    const [checkPassword, setCheckPassword] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isSocialSignup, setIsSocialSignup] = useState(false);

    const handleChangeInput = (field: keyof SignupRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSentVerification = () => {
        setIsVerificationSent(true);
    };

    useEffect(() => {
        const checkSocialSignup = async () => {
            try {
                const data = await fetchSocialTempInfo();
                console.log(data);
                setIsSocialSignup(true);

                // tempUuid를 formData에 저장
                setFormData((prev) => ({ ...prev, tempUuid: data.tempUuid }));
            } catch (error) {
                // 실패 (401) → 일반 회원가입
                setIsSocialSignup(false);
            }
        };

        checkSocialSignup();
    }, []);

    return (
        <div className="flex h-full flex-col justify-between px-4 py-5">
            <div className="flex flex-col gap-10">
                <div className="relative">
                    <div className="flex gap-4">
                        <Input
                            placeholder="아이디"
                            value={formData.loginId}
                            onChange={(e) => {
                                handleChangeInput('loginId', e.target.value);
                                validateLoginId(e.target.value);
                            }}
                        />
                        <Button className="h-9 text-[0.75rem]">중복 확인</Button>
                    </div>
                    <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
                        {errors.loginId}
                    </div>
                </div>

                <div className="relative">
                    <PasswordInput
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={(e) => {
                            handleChangeInput('password', e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />
                    <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
                        {errors.password}
                    </div>
                </div>
                <div className="relative">
                    <PasswordInput
                        placeholder="비밀번호 확인"
                        value={checkPassword}
                        onChange={(e) => {
                            setCheckPassword(e.target.value);
                            validatePasswordConfirm(e.target.value, formData.password);
                        }}
                    />
                    <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
                        {errors.passwordConfirm}
                    </div>
                </div>
                <div className="relative">
                    <Input
                        placeholder="닉네임"
                        value={formData.nickName}
                        onChange={(e) => {
                            handleChangeInput('nickName', e.target.value);
                            validateNickName(e.target.value);
                        }}
                    />
                    <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
                        {errors.nickName}
                    </div>
                </div>
                <div className="relative">
                    <div className="flex gap-4">
                        <Input
                            placeholder="전화번호"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                handleChangeInput('phoneNumber', e.target.value);
                                validatePhoneNumber(e.target.value);
                            }}
                        />
                        <Button className="h-9 text-[0.75rem]" onClick={handleSentVerification}>
                            인증번호 받기
                        </Button>
                    </div>
                    <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
                        {errors.phoneNumber}
                    </div>
                </div>
                {isVerificationSent && (
                    <div className="flex gap-4">
                        <Input
                            placeholder="인증번호 입력"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <Button className="h-9 text-[0.75rem]">확인</Button>
                    </div>
                )}
            </div>
            <Button>회원가입</Button>
        </div>
    );
};

export default SignupPage;
