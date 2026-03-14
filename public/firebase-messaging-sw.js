// Firebase Cloud Messaging Service Worker
// 백그라운드 알림을 처리합니다

// Firebase SDK 임포트 (CDN 사용)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: 'AIzaSyCvM_PCuP8ebKKkzQybBXxp7ROZWJw6Kt4',
    authDomain: 'seeyouagain-4c7fd.firebaseapp.com',
    projectId: 'seeyouagain-4c7fd',
    storageBucket: 'seeyouagain-4c7fd.firebasestorage.app',
    messagingSenderId: '766195192478',
    appId: '1:766195192478:web:389929d80c8ca737b4a18f',
    measurementId: 'G-BHMN9MNPB9',
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Messaging 인스턴스 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 수신 처리
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification?.title || '새로운 알림';
    const notificationOptions = {
        body: payload.notification?.body || '',
        icon: payload.notification?.icon || '/icon-192x192.png',
        badge: payload.notification?.badge || '/icon-192x192.png',
        image: payload.notification?.image,
        data: payload.data,
        tag: payload.data?.type || 'default',
        requireInteraction: false,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification click received.', event);

    event.notification.close();

    // 알림 데이터에서 URL 가져오기
    const clickAction = event.notification.data?.click_action || '/';
    const urlToOpen = new URL(clickAction, self.location.origin).href;

    // 해당 URL을 가진 창이 이미 열려있는지 확인
    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true,
            })
            .then((windowClients) => {
                // 이미 열려있는 창이 있으면 포커스
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }

                // 열려있는 창이 없으면 새 창 열기
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
