import { useState } from 'react';
import { postBoard, fetchMyPosts } from '@/api/board';
import { BoardForm, MyPostParam, MyPostResponseData, MyPostBoard, MyPostData } from '@/types/board';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export const useBoardPost = () => {
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

    const queryClient = useQueryClient();

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

    const handleAddImages = (files: FileList) => {
        const fileArray = Array.from(files);
        setSelectedImages((prev) => [...prev, ...fileArray]);
        setFormData((prev) => ({
            ...prev,
            count: prev.count + fileArray.length,
            isPhotoUploaded: true,
        }));
    };

    const handleDeleteImages = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
        setFormData((prev) => ({
            ...prev,
            count: prev.count - 1,
            isPhotoUploaded: prev.count > 1,
        }));
    };

    const handleDragOnMap = (map: kakao.maps.Map) => {
        const latlng = map.getCenter();
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            if (status === kakao.maps.services.Status.OK && result[0]) {
                const address = result[0].address;

                setFormData((prev) => ({
                    ...prev,
                    latitude: latlng.getLat(),
                    longitude: latlng.getLng(),
                    city: address.region_1depth_name,
                    town: address.region_2depth_name,
                }));
            }
        });
    };

    return {
        isSubmitting,
        selectedImages,
        formData,
        tagInput,
        handleDragOnMap,
        handleDeleteImages,
        handleAddImages,
        setTagInput,
        handlePostBoard,
        handleChangeInput,
        handleAddTag,
        handleDeleteTag,
    };
};

export const useMyPost = (params: MyPostParam) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery<
            MyPostResponseData,
            Error,
            MyPostBoard,
            (string | number | undefined)[],
            number | null
        >({
            queryKey: ['myPost', params?.sortDirection, params?.size],
            initialPageParam: null,
            queryFn: ({ pageParam = null }) => {
                return fetchMyPosts({
                    cursorId: pageParam,
                    size: params?.size ?? 10,
                    sortDirection: params?.sortDirection,
                });
            },
            getNextPageParam: (lastPage) => {
                return lastPage.board.hasNext ? lastPage.board.nextCursor : undefined;
            },
            select: (data) => {
                const boardCount = data.pages[0]?.boardCount ?? 0;
                const dataList = data.pages.flatMap((page) => page.board.data);
                const last = data.pages[data.pages.length - 1]?.board;

                return {
                    boardCount,
                    data: dataList,
                    size: last?.size ?? params?.size ?? 10,
                    nextCursor: last?.nextCursor ?? 0,
                    hasNext: last?.hasNext ?? false,
                    empty: dataList.length === 0,
                };
            },
        });

    const boardCount = data?.boardCount ?? 0;
    const dataList = (data?.data ?? []) as MyPostData[];

    return {
        data: dataList,
        boardCount,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    };
};
