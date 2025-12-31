import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessageDto } from '@/types/chat';

const senderId = 1;

// STOMP 클라이언트 생성
const client = new Client({
    webSocketFactory: () => {
        // SockJS 엔드포인트 설정
        return new SockJS('https://dev-api.seeyouagain.store/ws-stomp', undefined, {
            transports: ['websocket'],
        });
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

client.debug = (str) => console.log('[stomp debug]', str);

let subscription: StompSubscription | null = null;

export const connect = () => {
    if (client.active) return;

    // 연결 이벤트 핸들러
    client.onConnect = (frame) => {
        console.log('Connected:', frame);

        if (subscription) {
            subscription.unsubscribe();
            subscription = null;
        }

        // 토픽 구독
        subscription = client.subscribe(`/queue/chat-${senderId}`, (message: Message) => {
            console.log('Received message:', message.body);
        });
    };

    // 연결 실패 이벤트 핸들러
    client.onStompError = (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
    };

    client.onWebSocketError = (evt) => {
        console.error('WebSocket error:', evt);
    };

    client.onWebSocketClose = (evt) => {
        console.error('WebSocket close:', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
        });
    };

    client.debug = (str) => {
        console.log('[STOMP Debug]:', str);
    };

    // 연결 해제 이벤트 핸들러
    client.onDisconnect = (frame) => {
        console.log('Disconnected:', frame);
        // 연결 해제 시 수행할 추가 작업
    };

    // 클라이언트 연결
    client.activate();
};

export function geteMessage() {
    if (!client.connected) return;
}

export function sendMessage(data: ChatMessageDto) {
    if (!client.connected) return;

    client.publish({
        destination: '/pub/chat/send',
        body: JSON.stringify(data), // 수정: DTO를 JSON으로
    });
}

// 임의로 연결 해제를 원할 때 사용할 함수
export function disconnect(force: boolean = false) {
    if (subscription) {
        subscription.unsubscribe();
        subscription = null;
    }

    client.deactivate({ force });
}
