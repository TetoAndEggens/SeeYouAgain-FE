interface KakaoLoginButtonProps {
    onClick: () => void;
}

export const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex h-[45px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#FEE500] px-4 transition-colors hover:bg-[#FDD835]"
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9 0C4.02944 0 0 3.35786 0 7.5C0 10.0141 1.51031 12.2344 3.84169 13.5469L2.86406 17.3906C2.79656 17.6391 3.08125 17.8359 3.29531 17.6906L7.84219 14.7844C8.22281 14.8266 8.60906 14.8516 9 14.8516C13.9706 14.8516 18 11.4937 18 7.34531C18 3.19688 13.9706 0 9 0Z"
                    fill="#3C1E1E"
                />
            </svg>
            <span className="text-sm font-medium text-[#3C1E1E]">카카오 로그인</span>
        </button>
    );
};
