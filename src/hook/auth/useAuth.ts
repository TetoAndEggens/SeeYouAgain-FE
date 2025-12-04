import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import axiosInstance from '@/lib/axios';

export const useAuth = () => {
    const { login, logout, setLoading, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);

            try {
                const response = await axiosInstance.post('/auth/reissue');
                login();
            } catch (error) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated };
};
