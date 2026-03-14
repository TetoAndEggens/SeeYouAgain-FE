import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface NotificationSettings {
    newAdopt: boolean;
    missing: boolean;
    chat: boolean;
}

export const useNotificationSettings = (isPushEnabled: boolean) => {
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        newAdopt: false,
        missing: false,
        chat: false,
    });

    // 초기 알림 설정 불러오기
    useEffect(() => {
        const savedSettings = localStorage.getItem('notification-settings');
        if (savedSettings) {
            try {
                setNotificationSettings(JSON.parse(savedSettings));
            } catch (error) {
                console.error('알림 설정 불러오기 실패:', error);
            }
        }
    }, []);

    // 개별 알림 설정 토글
    const handleNotificationSettingToggle = (key: keyof NotificationSettings) => {
        if (!isPushEnabled) {
            toast.error('먼저 푸시 알림을 활성화해주세요.');
            return;
        }
        setNotificationSettings((prev) => {
            const newSettings = {
                ...prev,
                [key]: !prev[key],
            };
            // localStorage에 저장
            localStorage.setItem('notification-settings', JSON.stringify(newSettings));
            return newSettings;
        });
    };

    // 알림 설정 초기화
    const resetNotificationSettings = () => {
        const resetSettings = {
            newAdopt: false,
            missing: false,
            chat: false,
        };
        setNotificationSettings(resetSettings);
        localStorage.setItem('notification-settings', JSON.stringify(resetSettings));
    };

    return {
        notificationSettings,
        handleNotificationSettingToggle,
        resetNotificationSettings,
    };
};
