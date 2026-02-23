'use client';

import { createRooms } from '@/api/chat';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateRooms = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (boardId: number) => createRooms(boardId),
        onSuccess: (chatRoomId) => {
            router.push(`/chat/detail/${chatRoomId}`);
        },
        onError: () => {
            toast.error('채팅방 생성에 실패했습니다.');
        },
    });

    return mutation;
};
