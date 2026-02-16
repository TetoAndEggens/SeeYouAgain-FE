import { withdrawal } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useFcm } from '@/hook/fcm/useFcm';

export const useWithdrawal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuthStore();
    const router = useRouter();
    const { removeFcmToken } = useFcm();

    const handleWithdrawal = async (password: string, reason: string) => {
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return false;
        }

        setIsLoading(true);
        try {
            await withdrawal({
                password,
                reason,
            });
            // FCM 토큰 삭제
            await removeFcmToken();
            logout();
            alert('회원탈퇴가 완료되었습니다.');
            router.push('/login');
            return true;
        } catch (error) {
            console.error('회원탈퇴 실패:', error);
            if (error instanceof AxiosError && error.response?.status === 401) {
                alert('비밀번호가 일치하지 않습니다.');
            } else if (error instanceof AxiosError && error.response?.status === 403) {
                alert('인증이 만료되었습니다. 다시 로그인해주세요.');
                logout();
                router.push('/login');
            } else {
                alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { handleWithdrawal, isLoading };
};
