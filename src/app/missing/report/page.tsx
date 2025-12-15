'use client';

import { CustomSelect } from '@/components/features/adopt/CustomSelect';
import { Form } from '@/components/layout/Form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useKakaoLoader from '@/hook/map/useKakaoLoader';
import { BoardForm } from '@/types/board';
import { Camera, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import Tag from '@/components/ui/tag';
import { postBoard } from '@/api/board';
import { useRouter } from 'next/navigation';

const MissingWritePage = () => {
    useKakaoLoader();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [formData, setFormData] = useState<BoardForm>({
        animalType: 'MISSING',
        species: 'DOG',
        title: '',
        content: '',
        breedType: '',
        sex: 'M',
        neuteredState: 'Y',
        color: '',
        latitude: 37.4979,
        longitude: 127.0276,
        city: '서울특별시',
        town: '강남구',
        tags: [],
        isPhotoUploaded: false,
        count: 0,
    });

    const verifyRequest = () => {
        if (!formData.title.trim()) {
            alert('제목을 입력해주세요');
            return false;
        }

        if (!formData.content.trim()) {
            alert('내용을 입력해주세요');
            return false;
        }

        if (!formData.breedType.trim()) {
            alert('품종을 입력해주세요');
            return false;
        }

        return true;
    };

    const handlePostBoard = async () => {
        setIsSubmitting(true);
        try {
            if (!verifyRequest()) return;
            const response = await postBoard(formData);
            if (response.data?.presignedUrls) {
                //이미지 s3 업로드 코드
            }
            router.push('/missing');
        } catch (error) {
            alert('글쓰기 작성에 실패했습니다');
            console.error(error);
            return;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeInput = (field: keyof BoardForm, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddTag = () => {
        if (!tagInput.trim()) return;

        setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), tagInput] }));
        setTagInput('');
    };

    const handleDeleteTag = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags?.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);
    return (
        <div>
            <div className="bg-gray-10 flex flex-col gap-12 p-4">
                <div>
                    <Form title="게시글 종류">
                        <div className="flex gap-4">
                            <Button
                                className="flex flex-1 flex-col"
                                variant={formData.animalType === 'MISSING' ? 'default' : 'outline'}
                                onClick={() => handleChangeInput('animalType', 'MISSING')}
                            >
                                <Search />
                                실종
                            </Button>
                            <Button
                                className="flex flex-1 flex-col"
                                variant={formData.animalType === 'sighting' ? 'default' : 'outline'}
                                onClick={() => handleChangeInput('animalType', 'sighting')}
                            >
                                <Camera />
                                목격
                            </Button>
                        </div>
                    </Form>
                </div>
                <div>
                    <Form importent title="제목">
                        <Input
                            placeholder="예: 흰색 말티즈를 찾습니다"
                            value={formData.title}
                            onChange={(e) => handleChangeInput('title', e.target.value)}
                        />
                    </Form>
                </div>
                <div>
                    <Form importent title="상세 내용">
                        <Textarea
                            placeholder={'실종 / 목격 상황을 자세히 설명해주세요.'}
                            className="h-[6rem] items-start"
                            value={formData.content}
                            onChange={(e) => handleChangeInput('content', e.target.value)}
                        />
                    </Form>
                </div>
                <div>
                    <Form title="상세 정보">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                            <Form title="품종">
                                <Input
                                    value={formData.breedType}
                                    onChange={(e) => handleChangeInput('breedType', e.target.value)}
                                />
                            </Form>
                            <Form title="색상">
                                <Input
                                    value={formData.color}
                                    onChange={(e) => handleChangeInput('color', e.target.value)}
                                />
                            </Form>
                            <Form title="성별">
                                <CustomSelect
                                    options={[
                                        { value: 'M', label: '수컷' },
                                        { value: 'F', label: '암컷' },
                                        { value: 'Q', label: '모름' },
                                    ]}
                                    value={formData.sex}
                                    onChange={(value) => handleChangeInput('sex', value)}
                                />
                            </Form>
                            <Form title="중성화 여부">
                                <CustomSelect
                                    options={[
                                        { value: 'Y', label: 'O' },
                                        { value: 'N', label: 'X' },
                                    ]}
                                    value={formData.neuteredState}
                                    onChange={(value) => handleChangeInput('neuteredState', value)}
                                />
                            </Form>
                        </div>
                    </Form>
                </div>
                <div>
                    <Form title="사진 업로드">
                        <div className="flex flex-col gap-4">
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onClick={(e) => {
                                    e.currentTarget.value = '';
                                }}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const files = Array.from(e.target.files);
                                        setSelectedImages((prev) => [...prev, ...files]);
                                        setFormData((prev) => ({
                                            ...prev,
                                            count: prev.count + files.length,
                                            isPhotoUploaded: true,
                                        }));
                                    }
                                }}
                            />

                            {selectedImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedImages.map((file, index) => (
                                        <div key={index} className="relative">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${index}`}
                                                width={100}
                                                height={100}
                                                className="h-24 w-full rounded object-cover"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                onClick={() => {
                                                    setSelectedImages((prev) =>
                                                        prev.filter((_, i) => i !== index)
                                                    );
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        count: prev.count - 1,
                                                        isPhotoUploaded: prev.count > 1,
                                                    }));
                                                }}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Form>
                </div>
                <div>
                    <Form importent title="위치">
                        <div className="relative">
                            <Map // 지도를 표시할 Container
                                center={{ lat: 33.450701, lng: 126.570667 }}
                                style={{
                                    // 지도의 크기
                                    width: '100%',
                                    height: '200px',
                                }}
                                level={3} // 지도의 확대 레벨
                                onDragEnd={(map) => {
                                    const latlng = map.getCenter();
                                    const geocoder = new kakao.maps.services.Geocoder();

                                    geocoder.coord2Address(
                                        latlng.getLng(),
                                        latlng.getLat(),
                                        (result, status) => {
                                            if (
                                                status === kakao.maps.services.Status.OK &&
                                                result[0]
                                            ) {
                                                const address = result[0].address;

                                                setFormData((prev) => ({
                                                    ...prev,
                                                    latitude: latlng.getLat(),
                                                    longitude: latlng.getLng(),
                                                    city: address.region_1depth_name,
                                                    town: address.region_2depth_name,
                                                }));
                                            }
                                        }
                                    );
                                }}
                            />
                            <Image
                                className="absolute top-[50%] left-[50%] z-10 -translate-x-1/2 -translate-y-[calc(50%+12.5px)]"
                                src={`/markers/${formData.animalType === 'MISSING' ? 'missing' : 'sighting'}.svg`}
                                alt={'marker'}
                                width={25}
                                height={25}
                            />
                        </div>
                    </Form>
                </div>
                <div>
                    <Form title="태그">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="태그를 입력해주세요"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                            />
                            <Button onClick={handleAddTag}>추가</Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {formData.tags?.map((value, index) => (
                                <div
                                    key={`${value}${index}`}
                                    onClick={() => handleDeleteTag(index)}
                                    className="cursor-pointer"
                                >
                                    <Tag>{`x ${value}`}</Tag>
                                </div>
                            ))}
                        </div>
                    </Form>
                </div>
            </div>
            <div className="sticky right-0 bottom-0 left-0 z-20 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex gap-2">
                    <Button onClick={handlePostBoard} disabled={isSubmitting} className="flex-1">
                        게시글 등록하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MissingWritePage;
