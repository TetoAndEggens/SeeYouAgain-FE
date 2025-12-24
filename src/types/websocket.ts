export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error'; // 연결 상태

// 구독 해제 핸들
export interface UnsubscribeFn {
    (): void;
}

// body 원문을 받는 콜백
export interface OnRawMessage {
    (rawBody: string): void;
}

// JSON.parse 이후 도메인 타입으로 받은 데이터
export interface OnParsedMessage<T> {
    (data: T): void;
}

// 에러 콜백
export interface onWsError {
    (error: unknown): void;
}
