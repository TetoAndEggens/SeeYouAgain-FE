import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const TestPage = () => {
    return (
        <div>
            테스트 페이지
            <div
                style={{
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        width: '300px',
                        height: '300px',
                        border: '1px solid red',
                    }}
                >
                    <Textarea placeholder="test textarea placeholder" />
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '300px',
                        border: '1px solid red',
                    }}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>열기</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>제목</DialogTitle>
                                <DialogDescription>설명</DialogDescription>
                            </DialogHeader>
                            다이얼로그 테스트용 임시 텍스트
                            <DialogFooter>
                                {/* Content에 기본 X 버튼이 이미 있음. 추가로 닫기 버튼 필요하면 */}
                                <DialogClose asChild>
                                    <Button variant="outline">닫기</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button>확인</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '300px',
                        border: '1px solid red',
                    }}
                >
                    <Button>테스트</Button>
                </div>
            </div>
        </div>
    );
};

export default TestPage;
