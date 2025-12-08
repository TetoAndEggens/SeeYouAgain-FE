import { withdrawal } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export const useWithdrawal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleWithdrawal = async () => {
        const confirmed = confirm(
            '정말 탈퇴하시겠습니까?\n탈퇴 후 모든 데이터가 삭제되며 복구할 수 없습니다.'
        );

        if (!confirmed) return false;

        setIsLoading(true);
        try {
            await withdrawal({
                password: 'tjddnr123@',
                reason: '서비스 이용 불편',
            });
            logout();
            alert('회원탈퇴가 완료되었습니다.');
            router.push('/login');
            return true;
        } catch (error) {
            console.error('회원탈퇴 실패:', error);
            if (error instanceof AxiosError && error.response?.status === 401) {
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
