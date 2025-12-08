import {
    sendSocialPhoneVerification,
    verifySocialPhoneCode,
    sendPhoneVerification,
    verifyPhoneCode,
    linkSocialAccount,
} from '@/api/auth';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export const usePhoneVerification = () => {
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [currentPhoneType, setCurrentPhoneType] = useState<'social' | 'normal'>('normal');
    const { login } = useAuthStore();
    const router = useRouter();

    const sendVerificationCode = async (
        isSocial: boolean,
        tempUuid: string | undefined,
        phoneNumber: string
    ) => {
        try {
            if (isSocial && tempUuid) {
                console.log({
                    phone: phoneNumber,
                    tempUuid: tempUuid,
                });
                const response = await sendSocialPhoneVerification({
                    phone: phoneNumber,
                    tempUuid: tempUuid,
                });

                console.log('인증번호 발송 성공:', response);
                setCurrentPhoneType('social');
                alert('인증번호가 발송되었습니다');
            } else {
                // 일반 회원가입
                const response = await sendPhoneVerification(phoneNumber);
                console.log('인증번호 발송 성공:', response);
                setCurrentPhoneType('normal');
                alert('인증번호가 발송되었습니다');
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
        // 인증번호 입력 확인
        if (!verificationCode || verificationCode.length !== 6) {
            alert('인증번호 6자리를 입력해주세요');
            return;
        }

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
                await verifyPhoneCode(phoneNumber, verificationCode);
                setIsPhoneVerified(true);
                alert('인증이 완료되었습니다');
            }
        } catch (error) {
            console.error('인증번호 확인 실패:', error);
            alert('인증번호가 일치하지 않습니다');
        }
    };

    return {
        isVerificationSent,
        verificationCode,
        setVerificationCode,
        isPhoneVerified,
        sendVerificationCode,
        confirmVerificationCode,
    };
};
