import { useEffect, useState, useCallback } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { getMessagingInstance, VAPID_KEY } from '@/lib/firebase';
import { registerFcmToken, deleteFcmToken } from '@/api/fcm';
import { toast } from 'sonner';

// 디바이스 ID 생성 또는 가져오기
export const getDeviceId = (): string => {
    const DEVICE_ID_KEY = 'fcm_device_id';
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
        // UUID v4 생성
        deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
};

export const useFcm = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 알림 권한 요청
    const requestPermission = useCallback(async () => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            setIsSupported(false);
            return false;
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }, []);

    // FCM 토큰 가져오기
    const getFcmToken = useCallback(async () => {
        setIsLoading(true);
        try {
            console.log('[FCM] 1. Messaging 인스턴스 가져오는 중...');
            const messaging = await getMessagingInstance();

            if (!messaging) {
                console.error('[FCM] Messaging 인스턴스를 가져올 수 없습니다.');
                setIsSupported(false);
                setIsLoading(false);
                toast.error('이 브라우저는 FCM을 지원하지 않습니다.');
                return null;
            }
            console.log('[FCM] 2. Messaging 인스턴스 가져오기 완료');

            // Service Worker 등록 확인
            console.log('[FCM] 3. Service Worker 확인 중...');
            console.log('[FCM] 현재 등록된 Service Worker들:', await navigator.serviceWorker.getRegistrations());

            // Service Worker 등록 또는 기존 것 사용
            let registration: ServiceWorkerRegistration;

            const registrations = await navigator.serviceWorker.getRegistrations();
            if (registrations.length > 0) {
                registration = registrations[0];
                console.log('[FCM] 4-1. 기존 Service Worker 사용:', registration.scope);
            } else {
                console.log('[FCM] 4-2. 새 Service Worker 등록 중...');
                registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                    scope: '/',
                });
                console.log('[FCM] 4-3. Service Worker 등록 완료');
            }

            console.log('[FCM] 4. Service Worker 확인 완료:', registration);

            // Service Worker가 active 상태가 될 때까지 대기 (최대 10초)
            if (!registration.active) {
                console.log('[FCM] 4-4. Service Worker 활성화 대기 중...');
                const maxWaitTime = 10000; // 10초
                const startTime = Date.now();

                await new Promise<void>((resolve, reject) => {
                    const checkActive = () => {
                        if (registration.active) {
                            console.log('[FCM] 4-5. Service Worker 활성화 완료');
                            resolve();
                        } else if (Date.now() - startTime > maxWaitTime) {
                            console.error('[FCM] Service Worker 활성화 타임아웃');
                            reject(new Error('Service Worker 활성화 시간 초과'));
                        } else {
                            console.log('[FCM] Service Worker 상태:', {
                                installing: !!registration.installing,
                                waiting: !!registration.waiting,
                                active: !!registration.active,
                            });
                            setTimeout(checkActive, 100);
                        }
                    };
                    checkActive();
                });
            } else {
                console.log('[FCM] 4-6. Service Worker가 이미 활성화되어 있습니다.');
            }

            console.log('[FCM] 5. FCM 토큰 발급 요청 중...');
            console.log('[FCM] VAPID Key:', VAPID_KEY);

            const currentToken = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration,
            });

            if (currentToken) {
                console.log('[FCM] 6. FCM Token 발급 성공:', currentToken);
                setToken(currentToken);

                // 백엔드에 토큰 등록
                console.log('[FCM] 7. 백엔드에 토큰 등록 중...');
                const deviceId = getDeviceId();
                await registerFcmToken({
                    token: currentToken,
                    deviceId,
                });
                console.log('[FCM] 8. 백엔드 토큰 등록 완료');

                return currentToken;
            } else {
                console.warn('[FCM] 토큰을 발급받지 못했습니다.');
                toast.error('FCM 토큰을 발급받지 못했습니다.');
                return null;
            }
        } catch (error: any) {
            console.error('[FCM] 토큰 발급 중 오류:', error);
            console.error('[FCM] 에러 코드:', error?.code);
            console.error('[FCM] 에러 메시지:', error?.message);

            // Firebase 에러 코드별 처리
            if (error?.code === 'messaging/unsupported-browser') {
                toast.error('이 브라우저는 알림을 지원하지 않습니다.');
            } else if (error?.code === 'messaging/permission-blocked') {
                toast.error('알림 권한이 차단되었습니다.');
            } else if (error?.code === 'messaging/failed-service-worker-registration') {
                toast.error('Service Worker 등록에 실패했습니다.');
            } else if (error?.message?.includes('API key')) {
                toast.error('Firebase 설정이 올바르지 않습니다. 관리자에게 문의하세요.');
            } else {
                toast.error('알림 설정에 실패했습니다: ' + (error?.message || '알 수 없는 오류'));
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // FCM 토큰 삭제 (로그아웃 시)
    const removeFcmToken = useCallback(async () => {
        try {
            const deviceId = getDeviceId();
            await deleteFcmToken(deviceId);
            setToken(null);
            console.log('FCM 토큰 삭제 완료');
        } catch (error: any) {
            // 404 에러는 무시 (이미 토큰이 없는 상태)
            if (error?.response?.status === 404) {
                console.log('FCM 토큰이 이미 삭제되었거나 존재하지 않습니다.');
                setToken(null);
                return;
            }
            console.error('FCM 토큰 삭제 실패:', error);
            throw error; // 다른 에러는 상위로 전달
        }
    }, []);

    // 포그라운드 메시지 수신 처리
    useEffect(() => {
        const setupForegroundMessaging = async () => {
            const messaging = await getMessagingInstance();
            if (!messaging) return;

            // 포그라운드에서 메시지 수신
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground message received:', payload);

                const title = payload.notification?.title || '새로운 알림';
                const body = payload.notification?.body || '';

                // Toast로 알림 표시
                toast(title, {
                    description: body,
                    duration: 5000,
                });
            });

            return unsubscribe;
        };

        setupForegroundMessaging();
    }, []);

    // 초기 권한 상태 확인
    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    return {
        token,
        isSupported,
        permission,
        isLoading,
        requestPermission,
        getFcmToken,
        removeFcmToken,
    };
};
