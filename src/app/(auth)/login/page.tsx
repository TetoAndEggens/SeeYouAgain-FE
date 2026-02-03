'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/passwordInput';
import { useLogin } from '@/hook/auth/useLogin';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { KakaoLoginButton } from '@/components/auth/KakaoLoginButton';
import { NaverLoginButton } from '@/components/auth/NaverLoginButton';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

const LoginPage = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, isLoading } = useLogin();

    const onSubmit = async () => {
        if (!loginId || !password) {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        }

        await handleLogin({ loginId, password });
    };

    const handleKakaoLogin = () => {
        const redirectUri = window.location.origin;
        window.location.href = `https://dev-api.seeyouagain.store/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(redirectUri)}`;
    };

    const handleNaverLogin = () => {
        const redirectUri = window.location.origin;
        window.location.href = `https://dev-api.seeyouagain.store/oauth2/authorization/naver?redirect_uri=${encodeURIComponent(redirectUri)}`;
    };

    const handleGoogleLogin = () => {
        const redirectUri = window.location.origin;
        window.location.href = `https://dev-api.seeyouagain.store/oauth2/authorization/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-20">
                <Image src="/logo.webp" alt="로고" width={140} height={140} />
            </div>
            <div className="mb-15 flex w-75 flex-col gap-2">
                <Input
                    placeholder="아이디"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                />
                <PasswordInput
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                />
                <Button onClick={onSubmit} disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                </Button>
                <div className="text-gray-40 flex justify-between gap-2 text-[0.75rem]">
                    <div className="flex gap-2">
                        <span>아이디 찾기</span>
                        <span>비밀번호 찾기</span>
                    </div>
                    <Link href={'/signup'}>회원가입</Link>
                </div>
            </div>
            <div className="flex w-75 flex-col gap-3">
                <KakaoLoginButton onClick={handleKakaoLogin} />
                <NaverLoginButton onClick={handleNaverLogin} />
                <GoogleLoginButton onClick={handleGoogleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;
