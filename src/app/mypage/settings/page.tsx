'use client';

import React from 'react';
import Switch from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import { X } from 'lucide-react';

const SettingsPage = () => {
    const [missingTag, setMissingTag] = React.useState<string>('');
    const [missingTags, setMissingTags] = React.useState<string[]>([]);
    const [adoptTag, setAdopTag] = React.useState<string>('');
    const [adoptTags, setAdopTags] = React.useState<string[]>([]);

    React.useEffect(() => {
        setMissingTags(['말티즈', '7살', '치아 안 좋음', '중성화']);
        setAdopTags(['말티즈', '7살', '치아 안 좋음', '중성화']);
    }, []);

    const addMissingTag = () => {
        setMissingTags([...missingTags, missingTag]);
        setMissingTag('');
    };

    const deleteMissingTag = (item: string) => {
        setMissingTags(missingTags.filter((tag) => tag !== item));
    };

    const addAdoptTag = () => {
        setAdopTags([...adoptTags, adoptTag]);
        setAdopTag('');
    };

    const deleteAdoptTag = (item: string) => {
        setAdopTags(adoptTags.filter((tag) => tag !== item));
    };

    return (
        <div>
            <div className="px-5 py-4 text-center">
                <p>원하는 정보를 받아보세요</p>
            </div>
            <div className="flex flex-col gap-6 px-2.5">
                <div className="flex items-center justify-between rounded-lg border bg-white px-2.5 py-5">
                    <div>
                        <p className="text-lg font-bold">푸시 알림</p>
                        <p className="">새로운 동물 정보를 받아보세요</p>
                    </div>
                    <Switch
                        className="h-7 w-12"
                        thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
                    />
                </div>
                <div className="flex flex-col gap-2 rounded-lg border bg-white px-2.5 py-5">
                    <div className="">
                        <p className="text-lg font-bold">목격 알림 키워드</p>
                        <p className="">관심있는 키워드를 추가하세요</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            value={missingTag}
                            onChange={(e) => {
                                console.log('e.target.value : ', e.target.value);
                                setMissingTag(e.target.value);
                            }}
                            onKeyUp={(e) => {
                                console.log('e : ', e.key);
                                if (e.key === 'Enter') addMissingTag();
                            }}
                        />
                        <Button className="" size={'sm'} onClick={addMissingTag}>
                            등록
                        </Button>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                        {missingTags.map((item, index) => (
                            <Tag
                                key={index}
                                variant="default"
                                size="sm"
                                isDelete={true}
                                onDelete={() => {
                                    console.log('삭제 태그:', item);
                                    deleteMissingTag(item);
                                }}
                            >
                                {item}
                            </Tag>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border bg-white px-2.5 py-5">
                    <div className="">
                        <p className="text-lg font-bold">입양 알림 키워드</p>
                        <p className="">관심있는 키워드를 추가하세요</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            value={adoptTag}
                            onChange={(e) => {
                                console.log('e.target.value : ', e.target.value);
                                setAdopTag(e.target.value);
                            }}
                            onKeyUp={(e) => {
                                console.log('e : ', e.key);
                                if (e.key === 'Enter') addAdoptTag();
                            }}
                        />
                        <Button className="" size={'sm'} onClick={addAdoptTag}>
                            등록
                        </Button>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                        {adoptTags.map((item, index) => (
                            <Tag
                                key={index}
                                variant="default"
                                size="sm"
                                isDelete={true}
                                onDelete={() => {
                                    console.log('삭제 태그:', item);
                                    deleteAdoptTag(item);
                                }}
                            >
                                {item}
                            </Tag>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-lg font-bold">알림 받을 내용</p>

                    <div className="flex items-center justify-between rounded-lg border bg-white px-2.5 py-5">
                        <div>
                            <p className="text-lg font-bold">새로운 입양 대기 동물</p>
                            <p className="">매일 새로 등록되는 동물 정보</p>
                        </div>
                        <Switch
                            className="h-7 w-12"
                            thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border bg-white px-2.5 py-5">
                        <div>
                            <p className="text-lg font-bold">실종·목격 게시물</p>
                            <p className="">실종 및 목격 정보 업데이트</p>
                        </div>
                        <Switch
                            className="h-7 w-12"
                            thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border bg-white px-2.5 py-5">
                        <div>
                            <p className="text-lg font-bold">채팅 메시지</p>
                            <p className="">새로운 채팅 메시지 알림</p>
                        </div>
                        <Switch
                            className="h-7 w-12"
                            thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
