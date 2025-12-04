import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';

export const useAuth = () => {
    const { login, logout, setLoading, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);

            try {
                const response = await apiClient.get('/auth/status');

                if (response.data) {
                    login();
                }
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
