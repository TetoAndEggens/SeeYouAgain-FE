import { getPushSetting } from '@/api/member';
import { create } from 'zustand';

interface NotificationStore {
    isPushEnabled: boolean;
    checkPushStatus: () => Promise<void>;
    setPushEnabled: (enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    isPushEnabled: false,

    setPushEnabled: (enabled) => set({ isPushEnabled: enabled }),
    checkPushStatus: async () => {
        try {
            const response = await getPushSetting();
            set({ isPushEnabled: response.data.isPushEnabled });
        } catch (error) {
            console.error('푸시 설정 확인 실패:', error);
            set({ isPushEnabled: false });
        }
    },
}));
