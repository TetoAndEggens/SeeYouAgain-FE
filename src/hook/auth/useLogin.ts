import { login } from '@/api/auth';
import { LoginRequest } from '@/types/auth';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { login: setAuthLogin } = useAuthStore();
    const router = useRouter();

    const handleLogin = async (loginData: LoginRequest) => {
        setIsLoading(true);
        try {
            await login(loginData);
            setAuthLogin();
            router.push('/');
            return true;
        } catch (error: any) {
            console.error('로그인 실패:', error);
            if (error.response?.status === 401) {
                alert('아이디 또는 비밀번호가 올바르지 않습니다');
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading };
};
