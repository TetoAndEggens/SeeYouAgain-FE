'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();

    useEffect(() => {
        const handleCallback = async () => {
            const status = searchParams.get('status');

            if (status === 'login') {
                login();
                router.replace('/');
            } else if (status === 'signup') {
                router.replace('/signup');
            } else {
                router.replace('/login');
            }
        };

        handleCallback();
    }, [router, searchParams, login]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="mb-4 text-lg">로그인 처리중...</div>
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            </div>
        </div>
    );
}
