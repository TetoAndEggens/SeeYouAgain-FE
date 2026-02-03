// 파일명: src/lib/stompClient.ts

import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ChatSendDto, ChatReadReceiveDto, ChatMessageDto } from '@/types/chat';

// 서버 코드 기준으로 구독 destination 확정
const CHAT_SUBSCRIBE_DEST = '/member/queue/chat';
const READ_SUBSCRIBE_DEST = '/member/queue/chat/read';

// STOMP 클라이언트 생성
const client = new Client({
    webSocketFactory: () => {
        // 서버가 withSockJS()를 쓰므로 SockJS로 연결
        return new SockJS('https://prod-api.seeyouagain.store/ws-stomp', null, {
            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        });
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

// debug 로그
client.debug = (str) => console.log('[stomp debug]', str);

// 구독이 2개이므로 분리
let chatSubscription: StompSubscription | null = null;
let readSubscription: StompSubscription | null = null;

// 연결 전 subscribe 호출을 대비해 핸들러 저장
let onChatMessage: ((payload: ChatMessageDto) => void) | null = null;
let onReadNotification: ((payload: ChatReadReceiveDto) => void) | null = null;

// 핸들러 중복 등록 방지
let handlersBound = false;

const bindHandlersOnce = () => {
    if (handlersBound) return;
    handlersBound = true;

    client.onConnect = (frame) => {
        console.log('Connected:', frame);

        // 재연결 시 자동 재구독
        if (onChatMessage) {
            subscribePersonal(onChatMessage, onReadNotification ?? undefined);
        }
    };

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

    client.onDisconnect = (frame) => {
        console.log('Disconnected:', frame);
    };
};

// 연결 함수
export const connect = () => {
    bindHandlersOnce();

    if (client.active) return;

    client.activate();
};

// 구독 함수
export const subscribePersonal = (
    chatHandler: (payload: ChatMessageDto) => void,
    readHandler?: (payload: ChatReadReceiveDto) => void
) => {
    bindHandlersOnce();

    // 핸들러 저장
    onChatMessage = chatHandler;
    onReadNotification = readHandler ?? null;

    // 연결 먼저 확인
    if (!client.active) connect();
    if (!client.connected) return;

    // 중복 구독 방지
    if (chatSubscription) {
        chatSubscription.unsubscribe();
        chatSubscription = null;
    }
    if (readSubscription) {
        readSubscription.unsubscribe();
        readSubscription = null;
    }

    // 서버 JSON에 맞게 전달
    chatSubscription = client.subscribe(CHAT_SUBSCRIBE_DEST, (message: Message) => {
        const parsed = JSON.parse(message.body) as ChatMessageDto;
        chatHandler(parsed);
    });

    if (readHandler) {
        readSubscription = client.subscribe(READ_SUBSCRIBE_DEST, (message: Message) => {
            const parsed = JSON.parse(message.body) as ChatReadReceiveDto;
            readHandler(parsed);
        });
    }
};

// 구독 해제 함수
export const unsubscribePersonal = () => {
    if (chatSubscription) {
        chatSubscription.unsubscribe();
        chatSubscription = null;
    }
    if (readSubscription) {
        readSubscription.unsubscribe();
        readSubscription = null;
    }

    onChatMessage = null;
    onReadNotification = null;
};

// 서버 @MessageMapping("/chat/send")에 맞는 publish 목적지
export const sendChatMessage = (data: ChatSendDto) => {
    if (!client.connected) return;

    client.publish({
        destination: '/pub/chat/send',
        body: JSON.stringify(data),
    });
};

// 읽음 처리 publish
export const sendRead = (data: { messageId: number }) => {
    if (!client.connected) return;

    client.publish({
        destination: '/pub/chat/read',
        body: JSON.stringify(data),
    });
};

// 연결 해제
export const disconnect = (force: boolean = false) => {
    unsubscribePersonal();
    client.deactivate({ force });
};
