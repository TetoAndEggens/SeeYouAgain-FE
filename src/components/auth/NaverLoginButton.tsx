interface NaverLoginButtonProps {
    onClick: () => void;
}

export const NaverLoginButton = ({ onClick }: NaverLoginButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex h-[45px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#03C75A] px-4 transition-colors hover:bg-[#02B350]"
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.1426 9.6825L5.4225 0H0V18H5.8575V8.3175L12.5775 18H18V0H12.1426V9.6825Z"
                    fill="white"
                />
            </svg>
            <span className="text-sm font-medium text-white">네이버 로그인</span>
        </button>
    );
};
