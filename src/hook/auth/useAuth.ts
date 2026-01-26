import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import axiosInstance from '@/lib/axios';

export const useAuth = () => {
    const { login, logout, setLoading, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);

            try {
                const { data } = await axiosInstance.post('/auth/reissue');
                login();
            } catch (error) {
                logout();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated };
};
