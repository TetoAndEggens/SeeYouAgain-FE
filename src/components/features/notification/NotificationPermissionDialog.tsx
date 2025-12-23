'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useFcm } from '@/hook/fcm/useFcm';

interface NotificationPermissionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NotificationPermissionDialog = ({
    open,
    onOpenChange,
}: NotificationPermissionDialogProps) => {
    const { requestPermission, getFcmToken, isLoading } = useFcm();
    const [error, setError] = React.useState<string | null>(null);

    const handleEnableNotification = async () => {
        try {
            setError(null);
            console.log('1. 알림 권한 요청 시작...');

            const granted = await requestPermission();
            console.log('2. 권한 요청 결과:', granted);

            if (granted) {
                console.log('3. FCM 토큰 발급 시작...');
                const token = await getFcmToken();
                console.log('4. FCM 토큰 발급 완료:', token ? '성공' : '실패');

                if (token) {
                    onOpenChange(false);
                } else {
                    setError('토큰 발급에 실패했습니다. Firebase 설정을 확인해주세요.');
                }
            } else {
                setError('알림 권한이 거부되었습니다.');
            }
        } catch (err) {
            console.error('알림 설정 중 오류:', err);
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                        <Bell className="text-primary h-8 w-8" />
                    </div>
                    <DialogTitle className="text-center">알림을 받아보시겠어요?</DialogTitle>
                    <DialogDescription className="text-center">
                        실종 동물 정보, 새로운 입양 동물, 채팅 메시지 등<br />
                        중요한 소식을 놓치지 마세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                    <Button onClick={handleEnableNotification} disabled={isLoading}>
                        {isLoading ? '설정 중...' : '알림 켜기'}
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        나중에
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
