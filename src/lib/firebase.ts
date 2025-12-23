import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getMessaging, Messaging, isSupported } from 'firebase/messaging';

// Firebase 설정 - 나중에 실제 값으로 교체 필요
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'YOUR_API_KEY',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

// VAPID Key - 나중에 실제 값으로 교체 필요
export const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || 'YOUR_VAPID_KEY';

let app: FirebaseApp;
let messaging: Messaging | null = null;

// Firebase 초기화
export const initializeFirebase = () => {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }
    return app;
};

// Messaging 인스턴스 가져오기 (브라우저 환경에서만)
export const getMessagingInstance = async () => {
    if (typeof window === 'undefined') {
        console.log('[Firebase] 서버 환경이므로 Messaging 사용 불가');
        return null;
    }

    if (messaging) {
        console.log('[Firebase] 기존 Messaging 인스턴스 반환');
        return messaging;
    }

    console.log('[Firebase] FCM 지원 여부 확인 중...');
    const supported = await isSupported();
    if (!supported) {
        console.warn('[Firebase] FCM이 이 브라우저에서 지원되지 않습니다.');
        return null;
    }
    console.log('[Firebase] FCM 지원됨');

    console.log('[Firebase] Firebase 앱 초기화 중...');
    console.log('[Firebase] API Key:', firebaseConfig.apiKey);
    console.log('[Firebase] Project ID:', firebaseConfig.projectId);

    try {
        initializeFirebase();
        console.log('[Firebase] Firebase 앱 초기화 완료');

        console.log('[Firebase] Messaging 인스턴스 생성 중...');
        messaging = getMessaging(app);
        console.log('[Firebase] Messaging 인스턴스 생성 완료');

        return messaging;
    } catch (error) {
        console.error('[Firebase] 초기화 중 오류:', error);
        return null;
    }
};
