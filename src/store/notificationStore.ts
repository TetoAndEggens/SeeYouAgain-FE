import { create } from 'zustand';

interface NotificationStore {
    isPushEnabled: boolean;
    setPushEnabled: (enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    isPushEnabled: false,
    setPushEnabled: (enabled) => set({ isPushEnabled: enabled }),
}));
