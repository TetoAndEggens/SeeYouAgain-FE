import { sendSocialPhoneVerification, verifySocialPhoneCode } from '@/api/auth';
import { useState } from 'react';

export const usePhoneVerification = () => {
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

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

    const confirmVerificationCode = async (phoneNumber: string) => {
        // 인증번호 입력 확인
        if (!verificationCode || verificationCode.length !== 6) {
            alert('인증번호 6자리를 입력해주세요');
            return;
        }

        try {
            await verifySocialPhoneCode(phoneNumber);

            setIsPhoneVerified(true);
            alert('인증이 완료되었습니다');
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
