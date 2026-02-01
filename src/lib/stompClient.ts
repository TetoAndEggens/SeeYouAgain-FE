import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatSendDto } from '@/types/chat';

// STOMP 클라이언트 생성
const client = new Client({
    webSocketFactory: () => {
        return new SockJS('https://prod-api.seeyouagain.store/ws-stomp', null, {
            // iframe transport 제외
            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        });
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

client.debug = (str) => console.log('[stomp debug]', str);

// 개인 메시지 읽음 및 알림 구독
let chatSubscription: StompSubscription | null = null;
let readSubscription: StompSubscription | null = null;

// 구독 콜백
let onChatMessage: ((payload: any) => void) | null = null;
let onReadNotification: ((payload: { messageId: number }) => void) | null = null;

// 핸들 중복 세팅 방지
let handlersBound = false;

const bindHandlersOnce = () => {
    if (handlersBound) return;
    handlersBound = true;

    client.onConnect = (frame) => {
        console.log('Connected:', frame);

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

export const connect = () => {
    bindHandlersOnce();

    if (client.active) return;

    client.activate();
};

// 채팅방 구독 함수
export const subscribePersonal = (
    chatHandler: (payload: any) => void,
    readHandler?: (payload: { messageId: number }) => void
) => {
    bindHandlersOnce();
    onChatMessage = chatHandler;
    onReadNotification = readHandler ?? null;

    // 연결이 안 되어 있으면 연결부터 시작
    if (!client.active) connect();

    // connected가 아니면, onConnect에서 재호출
    if (!client.connected) return;

    // 기존 구독 해제
    if (chatSubscription) {
        chatSubscription.unsubscribe();
        chatSubscription = null;
    }

    if (readSubscription) {
        readSubscription.unsubscribe();
        readSubscription = null;
    }

    // 개인 채팅 메시지 수신 구독 코드
    chatSubscription = client.subscribe('/member/queue/chat', (message: Message) => {
        try {
            chatHandler(JSON.parse(message.body));
        } catch {
            chatHandler({ content: message.body });
        }
    });

    // 읽음 알림 수신 구독 코드
    if (readHandler) {
        readSubscription = client.subscribe('/member/queue/chat/read', (message: Message) => {
            try {
                readHandler(JSON.parse(message.body));
            } catch {
                readHandler({ messageId: 0 });
            }
        });
    }
};

// 채팅방 구독 해제 함수
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

// 채팅 전송 코드
export const sendChatMessage = (data: ChatSendDto) => {
    if (!client.connected) return;

    client.publish({
        destination: '/pub/chat/send',
        body: JSON.stringify(data),
    });
};

// 읽음 처리 전송 코드
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
