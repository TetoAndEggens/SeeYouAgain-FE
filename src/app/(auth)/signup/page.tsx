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
import { toast } from 'sonner';
import { Copy, Mail, CheckCircle2, Loader2 } from 'lucide-react';

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
        verificationInfo,
        openEmailApp,
        checkVerificationStatus,
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
        <div className="flex h-full flex-col px-4 py-5">
            <div className="flex flex-col gap-6">
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
                {isVerificationSent && verificationInfo && (
                    <div className="flex flex-col gap-3 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                        {/* 안내 문구 */}
                        <div className="text-center">
                            <p className="text-sm font-semibold text-blue-900">
                                아래 인증번호를 복사하여
                            </p>
                            <p className="text-sm font-semibold text-blue-900">
                                이메일로 전송해주세요
                            </p>
                        </div>

                        {/* 인증번호 표시 */}
                        <div className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
                            <span className="font-mono text-xl font-bold text-blue-600">
                                {verificationInfo.code}
                            </span>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(verificationInfo.code);
                                    toast.success('인증번호가 복사되었습니다!');
                                }}
                                className="gap-1"
                            >
                                <Copy className="h-4 w-4" />
                                복사
                            </Button>
                        </div>

                        {/* 발송 대상 이메일 */}
                        <div className="rounded-md bg-white p-2.5 text-center">
                            <p className="text-xs text-gray-600">발송 대상</p>
                            <p className="font-mono text-sm font-medium text-gray-800">
                                {verificationInfo.targetEmail}
                            </p>
                        </div>

                        {/* 이메일 앱 열기 버튼 */}
                        <Button onClick={openEmailApp} className="w-full gap-2" variant="default">
                            <Mail className="h-4 w-4" />
                            이메일 앱 열기
                        </Button>

                        {/* 인증 상태 */}
                        <div className="flex flex-col gap-2">
                            {isPhoneVerified ? (
                                <div className="flex items-center justify-center gap-2 rounded-md bg-green-50 p-2.5 text-sm font-medium text-green-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                    인증이 완료되었습니다!
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-center gap-2 py-1 text-sm text-gray-600">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>인증 완료 대기 중...</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => checkVerificationStatus(formData.phoneNumber)}
                                        className="h-8 text-xs"
                                    >
                                        수동으로 확인하기
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* 기존 방식 (fallback) */}
                {isVerificationSent && !verificationInfo && (
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
            <Button onClick={handleSubmit} className="mt-8 mb-4">
                회원가입
            </Button>
        </div>
    );
};

export default SignupPage;
