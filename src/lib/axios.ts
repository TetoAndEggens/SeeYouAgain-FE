import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            //로그아웃
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
