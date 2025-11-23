'use client';

import { Drawer } from 'vaul';

interface VaulDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    coord: { lng: number; lat: number };
}

export default function VaulDrawer({ open, onOpenChange, coord }: VaulDrawerProps) {
    return (
        <Drawer.Root noBodyStyles={true} open={open} onOpenChange={onOpenChange}>
            <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:text-white dark:hover:bg-[#1A1A19]">
                Open Drawer
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-50" />
                <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] outline-none">
                    <div className="flex-1 rounded-t-[10px] bg-white p-4">
                        <div
                            aria-hidden
                            className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
                        />
                        <div className="mx-auto max-w-md">
                            <Drawer.Title className="mb-4 font-medium text-gray-900">
                                좌표 정보
                            </Drawer.Title>
                            <Drawer.Description className="mb-4 text-sm text-gray-600">
                                선택한 위치의 좌표를 표시합니다.
                            </Drawer.Description>

                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium">위도:</span> {coord.lat}
                                </div>
                                <div>
                                    <span className="font-medium">경도:</span> {coord.lng}
                                </div>
                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
