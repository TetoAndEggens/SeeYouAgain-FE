'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SocialSignupPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/signup');
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="mb-4 text-lg">잠시만 기다려주세요...</div>
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            </div>
        </div>
    );
}
