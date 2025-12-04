'use client';

import { useAuth } from '@/hook/auth/useAuth';
import { useAuthStore } from '@/store/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    useAuth(); // 로그인 상태 초기화

    const { isLoading } = useAuthStore();

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
