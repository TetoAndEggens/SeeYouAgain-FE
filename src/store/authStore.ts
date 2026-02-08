import { User } from '@/types/auth';
import { create } from 'zustand';

interface AuthStore {
    // 상태
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;

    // 액션
    login: () => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    // 초기 상태
    isAuthenticated: false,
    isLoading: true,
    user: null,

    // 사용자 설정 (로그인)
    login: () =>
        set({
            isAuthenticated: true,
            isLoading: false,
        }),

    // 로그아웃
    logout: () =>
        set({
            isAuthenticated: false,
            isLoading: false,
            user: null,
        }),

    // 로딩 상태 변경
    setLoading: (loading) => set({ isLoading: loading }),

    setUser: (user) => set({ user }),
}));
