import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MyPage = () => {
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
                <div className="border-gray-10 flex justify-between border p-4">
                    <span className="text-destructive">로그아웃</span>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
