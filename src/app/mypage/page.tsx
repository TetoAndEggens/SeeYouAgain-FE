'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useWithdrawal } from '@/hook/auth/useWithdrawal';
import { useFcm } from '@/hook/fcm/useFcm';
import { toast } from 'sonner';

const MyPage = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading, logout, user } = useAuthStore();
    const { handleWithdrawal, isLoading } = useWithdrawal();
    const { removeFcmToken } = useFcm();

    React.useEffect(() => {
        router.prefetch('/login');
    }, [router]);

    React.useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            toast.error('로그인이 필요합니다.');
            router.replace('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    if (authLoading || !isAuthenticated) {
        return null;
    }

    const handleLogout = async () => {
        const confirmed = confirm('로그아웃 하시겠습니까?');
        if (confirmed) {
            await removeFcmToken();
            logout();
            router.push('/login');
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 p-6">
                {user?.profile ? (
                    <img
                        src={user.profile}
                        alt={user.nickName}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="bg-gray-20 h-16 w-16 rounded-full"></div>
                )}
                <div>
                    <p className="text-[1.25rem] font-bold">{user?.nickName || '사용자'}</p>
                </div>
            </div>
            <hr></hr>
            <div className="flex-1">
                <Link
                    href={'mypage/settings'}
                    className="border-gray-10 flex justify-between border p-4"
                >
                    <span>알림 설정</span>
                    <ChevronRight strokeWidth={1} />
                </Link>
                <Link
                    href={'mypage/posts'}
                    className="border-gray-10 flex justify-between border p-4"
                >
                    <span>내가 작성한 게시글</span>
                    <ChevronRight strokeWidth={1} />
                </Link>
                <Link href={'chat'} className="border-gray-10 flex justify-between border p-4">
                    <span>채팅 내역</span>
                    <ChevronRight strokeWidth={1} />
                </Link>
                <button
                    onClick={handleLogout}
                    className="border-gray-10 flex w-full justify-between border p-4 text-left"
                >
                    <span className="text-destructive">로그아웃</span>
                </button>
                <button
                    onClick={handleWithdrawal}
                    disabled={isLoading}
                    className="border-gray-10 flex w-full justify-between border p-4 text-left disabled:opacity-50"
                >
                    <span className="text-destructive">회원 탈퇴</span>
                </button>
            </div>
        </div>
    );
};

export default MyPage;
