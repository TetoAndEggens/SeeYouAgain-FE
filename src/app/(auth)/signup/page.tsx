'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import PasswordInput from '@/components/ui/passwordInput';
import { SignupRequest } from '@/types/auth';
import {
    fetchSocialTempInfo,
    sendSocialPhoneVerification,
    signup,
    verifySocialPhoneCode,
} from '@/api/auth';
import { useSignupValidation } from '@/hook/auth/useSignupValidation';

const SignupPage = () => {
    const {
        errors,
        validateLoginId,
        validatePassword,
        validatePasswordConfirm,
        validateNickName,
        validatePhoneNumber,
        checkDupLoginId,
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
    const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 추가
    const [isAvailableId, setIsAvailableId] = useState(false);

    const handleChangeInput = (field: keyof SignupRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSentVerification = async () => {
        try {
            if (isSocialSignup && formData.tempUuid) {
                console.log({
                    phone: formData.phoneNumber,
                    tempUuid: formData.tempUuid,
                });
                const response = await sendSocialPhoneVerification({
                    phone: formData.phoneNumber,
                    tempUuid: formData.tempUuid,
                });

                console.log('인증번호 발송 성공:', response);
                alert('인증번호가 발송되었습니다');
            } else {
                // 일반 회원가입 (아직 미구현)
                alert('일반 회원가입 폰 인증은 아직 지원되지 않습니다');
                return;
            }

            setIsVerificationSent(true);
        } catch (error) {
            console.error('인증번호 발송 실패:', error);
            alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleConfirmVerification = async () => {
        // 인증번호 입력 확인
        if (!verificationCode || verificationCode.length !== 6) {
            alert('인증번호 6자리를 입력해주세요');
            return;
        }

        try {
            await verifySocialPhoneCode(formData.phoneNumber);

            setIsPhoneVerified(true);
            alert('인증이 완료되었습니다');
        } catch (error) {
            console.error('인증번호 확인 실패:', error);
            alert('인증번호가 일치하지 않습니다');
        }
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
        const checkSocialSignup = async () => {
            try {
                const { data } = await fetchSocialTempInfo();
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
                            onClick={handleSentVerification}
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
