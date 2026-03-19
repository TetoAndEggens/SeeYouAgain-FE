import {
    sendSocialPhoneVerification,
    verifySocialPhoneCode,
    sendPhoneVerification,
    verifyPhoneCode,
    linkSocialAccount,
} from '@/api/auth';
import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';

export const usePhoneVerification = () => {
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [currentPhoneType, setCurrentPhoneType] = useState<'social' | 'normal'>('normal');
    const [verificationInfo, setVerificationInfo] = useState<{
        code: string;
        targetEmail: string;
    } | null>(null);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);
    const { login } = useAuthStore();
    const router = useRouter();

    const sendVerificationCode = async (
        isSocial: boolean,
        tempUuid: string | undefined,
        phoneNumber: string
    ) => {
        try {
            let response;

            if (isSocial && tempUuid) {
                response = await sendSocialPhoneVerification({
                    phone: phoneNumber,
                    tempUuid: tempUuid,
                });
                setCurrentPhoneType('social');
            } else {
                // 일반 회원가입
                response = await sendPhoneVerification(phoneNumber);
                setCurrentPhoneType('normal');
            }

            // MO 방식: API 응답에 code 포함
            // 서버 응답 구조: { data: { code: "123456", emailAddress: "xxx@gmail.com" } }
            const codeData = response.data || response;
            if (codeData.code) {
                setVerificationInfo({
                    code: codeData.code,
                    targetEmail:
                        codeData.emailAddress ||
                        process.env.NEXT_PUBLIC_VERIFICATION_EMAIL ||
                        'taetoeggen556@gmail.com',
                });

                // 인증 완료 폴링 시작
                // startPolling(phoneNumber, isSocial);
            }

            setIsVerificationSent(true);
        } catch (error) {
            console.error('인증번호 발송 실패:', error);
            if (error instanceof AxiosError && error.response?.status === 409) {
                alert('이미 사용 중인 전화번호입니다');
            } else {
                alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    const confirmVerificationCode = async (phoneNumber: string) => {
        try {
            if (currentPhoneType === 'social') {
                const response = await verifySocialPhoneCode(phoneNumber);

                // LINK 상태: 이미 가입된 계정, 연동 확인
                if (response.data.status === 'LINK') {
                    const confirmed = confirm(
                        response.data.message ||
                            '이미 가입된 계정입니다. 소셜 계정을 연동하시겠습니까?'
                    );

                    if (confirmed) {
                        const linkResponse = await linkSocialAccount();

                        // 연동 성공 → 로그인 처리
                        if (
                            linkResponse.data.status === 'LOGIN' &&
                            linkResponse.data.loginResponse
                        ) {
                            login();
                            alert('계정 연동이 완료되었습니다.');
                            router.push('/');
                        }
                    }
                    return;
                }

                // LOGIN 상태: 바로 로그인 처리
                if (response.data.status === 'LOGIN' && response.data.loginResponse) {
                    login();
                    alert('로그인되었습니다.');
                    router.push('/');
                    return;
                }

                // SUCCESS 상태: 인증 완료
                setIsPhoneVerified(true);
                alert('인증이 완료되었습니다');
            } else {
                await verifyPhoneCode(phoneNumber);
                setIsPhoneVerified(true);
                alert('인증이 완료되었습니다');
            }
        } catch (error) {
            console.error('인증번호 확인 실패:', error);
            alert('인증번호가 일치하지 않습니다');
        }
    };

    // 서버에 인증 완료 여부 확인
    const checkVerificationStatus = async (phoneNumber: string, isSocial: boolean) => {
        try {
            const verificationFunc = isSocial ? verifyPhoneCode : verifySocialPhoneCode;

            const response = await verificationFunc(phoneNumber);

            if (response.data.verified) {
                setIsPhoneVerified(true);
                stopPolling();
                return true;
            }
            return false;
        } catch (error) {
            console.error('인증 상태 확인 실패:', error);
            return false;
        }
    };

    // 폴링 시작
    const startPolling = (phoneNumber: string, isSocial: boolean) => {
        // 기존 폴링 중지
        stopPolling();

        // 5초마다 인증 상태 확인
        pollingInterval.current = setInterval(() => {
            checkVerificationStatus(phoneNumber, isSocial);
        }, 5000);

        // 5분 후 자동 중지
        setTimeout(
            () => {
                stopPolling();
            },
            5 * 60 * 1000
        );
    };

    // 폴링 중지
    const stopPolling = () => {
        if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
            pollingInterval.current = null;
        }
    };

    // 이메일 앱 열기
    const openEmailApp = () => {
        if (!verificationInfo) return;

        const subject = '휴대폰 인증';
        const body = verificationInfo.code;
        const mailtoLink = `mailto:${verificationInfo.targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    };

    // 컴포넌트 unmount 시 폴링 중지
    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, []);

    return {
        isVerificationSent,
        verificationCode,
        setVerificationCode,
        isPhoneVerified,
        sendVerificationCode,
        confirmVerificationCode,
        verificationInfo,
        openEmailApp,
        checkVerificationStatus: (phoneNumber: string) =>
            checkVerificationStatus(phoneNumber, currentPhoneType === 'social'),
    };
};
