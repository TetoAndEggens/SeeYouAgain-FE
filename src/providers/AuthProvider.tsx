'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hook/auth/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useFcm } from '@/hook/fcm/useFcm';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    useAuth(); // 로그인 상태 초기화

    const { isLoading, isAuthenticated } = useAuthStore();
    const { permission, getFcmToken } = useFcm();

    // 로그인 시 FCM 토큰 자동 등록
    useEffect(() => {
        const registerFcmTokenIfNeeded = async () => {
            // 로그인 상태이고, 브라우저 알림 권한이 이미 허용된 경우에만 자동 등록
            if (isAuthenticated && permission === 'granted') {
                try {
                    await getFcmToken();
                    console.log('[AuthProvider] FCM 토큰 자동 등록 완료');
                } catch (error) {
                    console.error('[AuthProvider] FCM 토큰 자동 등록 실패:', error);
                }
            }
        };

        registerFcmTokenIfNeeded();
    }, [isAuthenticated, permission, getFcmToken]);

    // 로딩 중이면 로딩 UI 표시
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-lg">로딩중...</div>
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
