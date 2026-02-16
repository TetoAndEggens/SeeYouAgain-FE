'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/ui/passwordInput';
import { Input } from '@/components/ui/input';

interface WithdrawalDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (password: string, reason: string) => Promise<void>;
    isLoading: boolean;
}

export function WithdrawalDialog({
    open,
    onOpenChange,
    onConfirm,
    isLoading,
}: WithdrawalDialogProps) {
    const [password, setPassword] = useState('');
    const [reason, setReason] = useState('');

    const handleConfirm = async () => {
        if (!password.trim()) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        await onConfirm(password, reason || '사용자 요청');

        // 초기화
        setPassword('');
        setReason('');
    };

    const handleCancel = () => {
        setPassword('');
        setReason('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>회원 탈퇴</DialogTitle>
                    <DialogDescription>
                        정말 탈퇴하시겠습니까?
                        <br />
                        탈퇴 후 모든 데이터가 삭제되며 복구할 수 없습니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            비밀번호 <span className="text-destructive">*</span>
                        </label>
                        <PasswordInput
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleConfirm();
                                }
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="reason" className="text-sm font-medium">
                            탈퇴 사유 (선택)
                        </label>
                        <Input
                            id="reason"
                            placeholder="탈퇴 사유를 입력하세요"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                        취소
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
                        {isLoading ? '처리 중...' : '탈퇴하기'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
