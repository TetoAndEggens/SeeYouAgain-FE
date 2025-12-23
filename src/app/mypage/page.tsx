'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useWithdrawal } from '@/hook/auth/useWithdrawal';
import { deleteFcmToken } from '@/api/fcm';

const MyPage = () => {
    const { logout } = useAuthStore();
    const router = useRouter();
    const { handleWithdrawal, isLoading } = useWithdrawal();

    const handleLogout = async () => {
        const confirmed = confirm('로그아웃 하시겠습니까?');
        if (confirmed) {
            try {
                // FCM 토큰 삭제
                const deviceId = localStorage.getItem('fcm_device_id');
                if (deviceId) {
                    await deleteFcmToken(deviceId);
                    console.log('FCM 토큰 삭제 완료');
                }
            } catch (error: any) {
                // 404 에러는 무시 (이미 토큰이 없는 상태)
                if (error?.response?.status === 404) {
                    console.log('FCM 토큰이 이미 삭제되었거나 존재하지 않습니다.');
                } else {
                    console.error('FCM 토큰 삭제 실패:', error);
                }
                // 토큰 삭제 실패해도 로그아웃은 진행
            }

            logout();
            router.push('/login');
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 p-6">
                <div className="bg-gray-20 border- h-16 w-16 rounded-full"></div>
                <div>
                    <p className="mb-2 text-[1.25rem] font-bold">김유기</p>
                    <p>test@email.com</p>
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
