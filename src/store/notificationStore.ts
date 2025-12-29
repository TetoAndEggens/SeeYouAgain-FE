import { getFcmTokens } from '@/api/fcm';
import { getDeviceId } from '@/hook/fcm/useFcm';
import { FcmToken } from '@/types/fcm';
import { create } from 'zustand';

interface NotificationStore {
    isPushEnabled: boolean;
    tokens: FcmToken[];
    unreadCount: number;
    checkPushStatus: () => Promise<void>;
    setPushEnabled: (enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    isPushEnabled: false,
    tokens: [],
    unreadCount: 0,

    setPushEnabled: (enabled) => set({ isPushEnabled: enabled }),
    checkPushStatus: async () => {
        try {
            const currentDeviceId = getDeviceId();
            const response = await getFcmTokens();
            const hasToken = response.data.some((token) => token.deviceId === currentDeviceId);
            set({
                isPushEnabled: hasToken,
                tokens: response.data,
            });
        } catch (error) {
            console.error('FCM 토큰 상태 확인 실패:', error);
            set({ isPushEnabled: false });
        }
    },
}));
