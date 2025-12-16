'use client';

import { Drawer } from 'vaul';
import { MissingSmallCard } from '../features/missing/MissingSmallCard';
import { AdoptAnimal } from '@/types/animal';

interface VaulDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mapAnimalData: AdoptAnimal[];
}

export default function VaulDrawer({ open, onOpenChange, mapAnimalData }: VaulDrawerProps) {
    return (
        <Drawer.Root noBodyStyles={true} open={open} onOpenChange={onOpenChange}>
            {/* <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:text-white dark:hover:bg-[#1A1A19]">
                Open Drawer
            </Drawer.Trigger> */}
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-50" />
                <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-[10px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] outline-none">
                    <div className="bg-gray-10 flex max-h-[100vh] flex-col rounded-t-[10px] p-4">
                        <div
                            aria-hidden
                            className="bg-gray-20 mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full"
                        />
                        <div className="mx-auto w-full max-w-md overflow-y-auto">
                            <Drawer.Title className="mb-4 text-[1.25rem] font-medium text-gray-50">
                                현재 지역의 동물들
                            </Drawer.Title>
                            <Drawer.Description className="text-gray-40 mb-4 text-[1rem]">
                                총 n마리
                            </Drawer.Description>

                            <div className="flex flex-col gap-4">
                                {/* {mapAnimalData.map((data) => (
                                    <MissingSmallCard
                                        key={data.id}
                                        cardType={data.cardType}
                                        name={data.name}
                                        tags={data.tags}
                                        location={data.location}
                                        date={data.date}
                                        image={data.image}
                                    />
                                ))} */}
                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
