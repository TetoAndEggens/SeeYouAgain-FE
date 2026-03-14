export interface ViolationData {
    boardId?: number;
    chatRoomId?: number;
    reason: string;
    detailReason: string | null;
    board: boolean;
}
