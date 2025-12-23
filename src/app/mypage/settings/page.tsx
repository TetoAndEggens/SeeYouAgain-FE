'use client';

import {useEffect, useState} from 'react';
import Switch from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import { X } from 'lucide-react';
import { useFcm } from '@/hook/fcm/useFcm';
import { NotificationPermissionDialog } from '@/components/features/notification/NotificationPermissionDialog';
import { toast } from 'sonner';

const SettingsPage = () => {
    const [missingTag, setMissingTag] = useState<string>('');
    const [missingTags, setMissingTags] = useState<string[]>([]);
    const [adoptTag, setAdopTag] = useState<string>('');
    const [adoptTags, setAdopTags] = useState<string[]>([]);
    const [showPermissionDialog, setShowPermissionDialog] = useState<boolean>(false);

    // FCM 관련 상태
    const { permission, isSupported, getFcmToken, removeFcmToken } = useFcm();
    const [isPushEnabled, setIsPushEnabled] = useState<boolean>(false);
    const [notificationSettings, setNotificationSettings] = useState({
        newAdopt: false,
        missing: false,
        chat: false,
    });

    // 초기 알림 권한 상태 확인
    useEffect(() => {
        if (permission === 'granted') {
            setIsPushEnabled(true);
        } else {
            setIsPushEnabled(false);
        }
    }, [permission]);

    useEffect(() => {
        setMissingTags(['말티즈', '7살', '치아 안 좋음', '중성화']);
        setAdopTags(['말티즈', '7살', '치아 안 좋음', '중성화']);
    }, []);

    // 푸시 알림 토글 핸들러
    const handlePushToggle = async (checked: boolean) => {
        if (!isSupported) {
            toast.error('이 브라우저는 알림을 지원하지 않습니다.');
            return;
        }

        if (checked) {
            // 알림 켜기
            if (permission === 'granted') {
                await getFcmToken();
                setIsPushEnabled(true);
                toast.success('알림이 활성화되었습니다.');
            } else if (permission === 'denied') {
                toast.error('알림 권한이 차단되었습니다. 브라우저 설정에서 허용해주세요.');
            } else {
                // 권한 요청 다이얼로그 표시
                setShowPermissionDialog(true);
            }
        } else {
            // 알림 끄기
            try {
                await removeFcmToken();
                setIsPushEnabled(false);
                toast.success('알림이 비활성화되었습니다.');
            } catch (error) {
                console.error('알림 비활성화 실패:', error);
                toast.error('알림 비활성화에 실패했습니다.');
            }
        }
    };

    // 개별 알림 설정 토글
    const handleNotificationSettingToggle = (key: keyof typeof notificationSettings) => {
        if (!isPushEnabled) {
            toast.error('먼저 푸시 알림을 활성화해주세요.');
            return;
        }
        setNotificationSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
        // TODO: 백엔드에 설정 저장
    };

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
                        checked={isPushEnabled}
                        onCheckedChange={handlePushToggle}
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
                            checked={notificationSettings.newAdopt}
                            onCheckedChange={() => handleNotificationSettingToggle('newAdopt')}
                            disabled={!isPushEnabled}
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
                            checked={notificationSettings.missing}
                            onCheckedChange={() => handleNotificationSettingToggle('missing')}
                            disabled={!isPushEnabled}
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
                            checked={notificationSettings.chat}
                            onCheckedChange={() => handleNotificationSettingToggle('chat')}
                            disabled={!isPushEnabled}
                            className="h-7 w-12"
                            thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
                        />
                    </div>
                </div>
            </div>

            {/* 알림 권한 요청 다이얼로그 */}
            <NotificationPermissionDialog
                open={showPermissionDialog}
                onOpenChange={(open) => {
                    setShowPermissionDialog(open);
                    // 다이얼로그가 닫힐 때 권한 상태 다시 확인
                    if (!open && permission === 'granted') {
                        setIsPushEnabled(true);
                    }
                }}
            />
        </div>
    );
};

export default SettingsPage;
