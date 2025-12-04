import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 에러이고, 재시도 안한 경우, reissue 요청 자체가 아닌 경우
        // 무한루프 방지
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/reissue')
        ) {
            originalRequest._retry = true;

            try {
                // RefreshToken으로 재발급
                await axiosInstance.post('/auth/reissue');

                // 원래 요청 재시도
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh 실패 → 로그아웃
                useAuthStore.getState().logout();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

///////////////////////////////////////////////
////////////개발 환경에서만 로그 출력/////////////
//////////////////////////////////////////////
if (process.env.NODE_ENV === 'development') {
    axiosInstance.interceptors.request.use((config) => {
        console.log('📤', config.method?.toUpperCase(), config.url);
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            console.log('📥', response.status, response.config.url);
            return response;
        },
        (error) => {
            console.error('❌', error.response?.status, error.config?.url);
            return Promise.reject(error);
        }
    );
}

export default axiosInstance;
