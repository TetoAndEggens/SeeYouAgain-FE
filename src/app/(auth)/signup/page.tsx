'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import PasswordInput from '@/components/ui/passwordInput';
import { SignupRequest } from '@/types/auth';
import { signup } from '@/api/auth';
import { useSignupValidation } from '@/hook/auth/useSignupValidation';
import { usePhoneVerification } from '@/hook/auth/usePhoneVerification';
import { useSocialSignup } from '@/hook/auth/useSocialSignup';

const SignupPage = () => {
    const [formData, setFormData] = useState<SignupRequest>({
        loginId: '',
        password: '',
        nickName: '',
        phoneNumber: '',
    });

    const [checkPassword, setCheckPassword] = useState('');
    const [isAvailableId, setIsAvailableId] = useState(false);

    const { isSocialSignup, tempUuid } = useSocialSignup();

    const {
        errors,
        validateLoginId,
        validatePassword,
        validatePasswordConfirm,
        validateNickName,
        validatePhoneNumber,
        checkDupLoginId,
    } = useSignupValidation();

    const {
        isVerificationSent,
        isPhoneVerified,
        verificationCode,
        setVerificationCode,
        sendVerificationCode,
        confirmVerificationCode,
    } = usePhoneVerification();

    const handleSendVerification = async () => {
        sendVerificationCode(isSocialSignup, formData.tempUuid, formData.phoneNumber);
    };

    const handleConfirmVerification = async () => {
        confirmVerificationCode(formData.phoneNumber);
    };

    const handleChangeInput = (field: keyof SignupRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCheckLoginId = async () => {
        try {
            const isAvailable = await checkDupLoginId(formData.loginId);

            if (isAvailable) {
                alert('사용 가능한 아이디입니다');
                setIsAvailableId(true);
            }
        } catch (error) {
            console.error('중복 확인 실패:', error);
        }
    };

    const handleSubmit = async () => {
        if (!validateLoginId(formData.loginId)) return;
        if (!validatePassword(formData.password)) return;
        if (!validatePasswordConfirm(checkPassword, formData.password)) return;
        if (!validateNickName(formData.nickName)) return;
        if (!validatePhoneNumber(formData.phoneNumber)) return;
        if (!isAvailableId) return;

        if (!isPhoneVerified) {
            alert('휴대폰 인증을 완료해주세요');
            return;
        }

        try {
            console.log(formData);
            await signup(formData);

            alert('회원가입이 완료되었습니다!');
            // 로그인 페이지로 이동
            window.location.href = '/login';
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        if (tempUuid) {
            setFormData((prev) => ({ ...prev, tempUuid }));
        }
    }, [tempUuid]);

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
                        <Button
                            disabled={!formData.loginId || errors.loginId !== ''}
                            className="h-9 text-[0.75rem]"
                            onClick={handleCheckLoginId}
                        >
                            중복 확인
                        </Button>
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
                        <Button
                            className="h-9 text-[0.75rem]"
                            disabled={!formData.phoneNumber || errors.phoneNumber !== ''}
                            onClick={handleSendVerification}
                        >
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
                        <Button className="h-9 text-[0.75rem]" onClick={handleConfirmVerification}>
                            확인
                        </Button>
                    </div>
                )}
            </div>
            <Button onClick={handleSubmit}>회원가입</Button>
        </div>
    );
};

export default SignupPage;
