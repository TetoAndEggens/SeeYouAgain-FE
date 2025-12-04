'use client';

import { Input } from '@/components/ui/input';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const LoginPage = () => {
    const router = useRouter();

    const handleKakaoLogin = () => {
        router.push('https://dev-api.seeyouagain.store/oauth2/authorization/kakao');
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-20">
                <Image src="/logo.webp" alt="로고" width={140} height={140} />
            </div>
            <div className="mb-15 flex w-[300px] flex-col gap-2">
                <Input placeholder="아이디" />
                <Input placeholder="비밀번호" type="password" />
                <div className="text-gray-40 flex justify-between gap-2 text-[0.75rem]">
                    <div className="flex gap-2">
                        <span>아이디 찾기</span>
                        <span>비밀번호 찾기</span>
                    </div>
                    <span>회원가입</span>
                </div>
            </div>
            <div>
                <button className="overflow-hidden" onClick={handleKakaoLogin}>
                    <Image
                        src="/kakao/kakao_login_medium_wide.png"
                        alt="카카오 로그인"
                        width={300}
                        height={45}
                        className="cursor-pointer"
                    />
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
