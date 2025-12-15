'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CustomSelect from './Selector';
import CustomPopover from '@/components/layout/Popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';

import { X } from 'lucide-react';

interface FilterProps {
    open: boolean;
    isOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filter({ open, isOpen }: FilterProps) {
    const [fromCalendarOpen, setFromCalendarOpen] = React.useState(false);
    const [toCalendarOpen, setToCalendarOpen] = React.useState(false);
    const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined);
    const [toDate, setToDate] = React.useState<Date | undefined>(undefined);

    return (
        // open && (
        <div className="flex flex-col items-center rounded-lg border border-gray-50 bg-[#F8F9FA] shadow-md">
            {/* <div
                // onClick={() => isOpen(false)}
                className="mx-5 w-full rounded-lg bg-white px-2 py-5"
            >
                <div className="flex justify-start gap-2">
                    <X size={20} /> 필터
                </div>
            </div> */}
            <div className="flex w-full flex-col justify-between gap-4 p-5">
                <div className="max-w-full gap-1 py-1">
                    <p className="font-semibold sm:text-base">날짜</p>
                    <div className="flex w-full items-center justify-between gap-1">
                        <CustomPopover
                            open={fromCalendarOpen}
                            setOpen={setFromCalendarOpen}
                            data={fromDate?.toLocaleDateString()}
                            icon={<ChevronDownIcon />}
                        >
                            <Calendar
                                mode="single"
                                selected={fromDate}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setFromDate(date);
                                    setFromCalendarOpen(false);
                                }}
                            />
                        </CustomPopover>
                        <p>~</p>
                        <CustomPopover
                            open={toCalendarOpen}
                            setOpen={setToCalendarOpen}
                            data={toDate?.toLocaleDateString()}
                            icon={<ChevronDownIcon />}
                            children={
                                <Calendar
                                    mode="single"
                                    selected={toDate}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setToDate(date);
                                        setToCalendarOpen(false);
                                    }}
                                />
                            }
                        />
                    </div>
                </div>
                <div className="grid max-w-full grid-cols-2 gap-4">
                    <div className="max-w-full gap-1 py-1">
                        <p className="font-semibold sm:text-base">동물 종류</p>
                        <CustomSelect
                            options={[
                                {
                                    label: '강아지',
                                    items: [
                                        {
                                            value: '포메라니안',
                                            name: '포메라니안',
                                        },
                                        {
                                            value: '치와와',
                                            name: '치와와',
                                        },
                                        {
                                            value: '리트리버',
                                            name: '리트리버',
                                        },
                                    ],
                                },
                                {
                                    label: '고양이',
                                    items: [
                                        {
                                            value: '코리안숏헤어',
                                            name: '코리안숏헤어',
                                        },
                                        {
                                            value: '러시안블루',
                                            name: '러시안블루',
                                        },
                                        {
                                            value: '페르시안',
                                            name: '페르시안',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </div>
                    <div className="max-w-full gap-1 py-1">
                        <p className="font-semibold sm:text-base">중성화 여부</p>
                        <CustomSelect
                            options={[
                                {
                                    items: [
                                        {
                                            value: '예',
                                            name: '예',
                                        },
                                        {
                                            value: '아니요',
                                            name: '아니요',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </div>
                    <div className="max-w-full gap-1 py-1">
                        <p className="font-semibold sm:text-base">성별</p>
                        <CustomSelect
                            options={[
                                {
                                    items: [
                                        {
                                            value: '수컷',
                                            name: '수컷',
                                        },
                                        {
                                            value: '암컷',
                                            name: '암컷',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </div>
                    <div className="max-w-full gap-1 py-1">
                        <p className="font-semibold sm:text-base">지역</p>
                        <div className="flex gap-1">
                            <CustomSelect placeholder="시" />
                            <CustomSelect placeholder="군/구" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-5 pb-2">
                <Button className="w-full">확인</Button>
            </div>
        </div>
        // )
    );
}
