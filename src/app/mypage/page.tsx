'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useWithdrawal } from '@/hook/auth/useWithdrawal';
import { useFcm } from '@/hook/fcm/useFcm';
import { WithdrawalDialog } from '@/components/features/mypage/WithdrawalDialog';

const MyPage = () => {
    const router = useRouter();
    const { logout, user } = useAuthStore();
    const { handleWithdrawal, isLoading } = useWithdrawal();
    const { removeFcmToken } = useFcm();
    const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);

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
                    onClick={() => setShowWithdrawalDialog(true)}
                    disabled={isLoading}
                    className="border-gray-10 flex w-full justify-between border p-4 text-left disabled:opacity-50"
                >
                    <span className="text-destructive">회원 탈퇴</span>
                </button>
            </div>

            {/* 회원탈퇴 다이얼로그 */}
            <WithdrawalDialog
                open={showWithdrawalDialog}
                onOpenChange={setShowWithdrawalDialog}
                onConfirm={async (password, reason) => {
                    const success = await handleWithdrawal(password, reason);
                    if (success) {
                        setShowWithdrawalDialog(false);
                    }
                }}
                isLoading={isLoading}
            />
        </div>
    );
};

export default MyPage;
