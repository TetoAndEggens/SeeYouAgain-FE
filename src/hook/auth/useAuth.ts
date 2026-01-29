import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import axiosInstance from '@/lib/axios';
import { usePathname } from 'next/navigation';

export const useAuth = () => {
    const { login, logout, setLoading, isAuthenticated } = useAuthStore();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            // 공개 페이지(로그인, 회원가입 등)에서는 인증 체크 스킵
            const publicPaths = ['/login', '/signup', '/auth/callback', '/auth/social-signup'];
            const isPublicPath = publicPaths.some((path) => pathname?.startsWith(path));

            if (isPublicPath) {
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const { data } = await axiosInstance.post('/auth/reissue');
                login();
            } catch (error) {
                logout();
                // 이미 로그인 페이지가 아닐 때만 리다이렉트
                if (typeof window !== 'undefined' && !isPublicPath) {
                    // window.location.href = '/login';
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname]);

    return { isAuthenticated };
};
