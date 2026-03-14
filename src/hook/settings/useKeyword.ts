import { deleteKeyword, getKeyword, postKeyword } from '@/api/notification';
import { KeywordResponse } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useKeyword = () => {
    const [missingKeyword, setMissingKeyword] = useState<string>('');
    const [missingKeywords, setMissingKeywords] = useState<KeywordResponse[]>([]);
    const [adoptKeyword, setAdoptKeyword] = useState<string>('');
    const [adoptKeywords, setAdoptKeywords] = useState<KeywordResponse[]>([]);
    const [isAddingKeyword, setIsAddingKeyword] = useState<boolean>(false);
    const [isDeletingKeywordId, setIsDeletingKeywordId] = useState<number | null>(null);

    const { data: myKeywords } = useQuery({
        queryKey: ['myKeywords'],
        queryFn: getKeyword,
        select: (data) => data.data,
    });

    const handleAddKeyword = async (keyword: string, keywordType: 'ABANDONED' | 'WITNESS') => {
        // 빈 값 검증
        const trimmedKeyword = keyword.trim();
        if (!trimmedKeyword) {
            toast.error('키워드를 입력해주세요.');
            return;
        }

        // 중복 검증
        const existingKeywords = keywordType === 'ABANDONED' ? adoptKeywords : missingKeywords;
        if (existingKeywords.some((k) => k.keyword === trimmedKeyword)) {
            toast.error('이미 등록된 키워드입니다.');
            return;
        }

        setIsAddingKeyword(true);
        try {
            const response = await postKeyword({
                keyword: trimmedKeyword,
                keywordType: keywordType,
                keywordCategoryType: 'BREED',
            });
            if (keywordType === 'ABANDONED') {
                setAdoptKeyword('');
                setAdoptKeywords((prev) => [...prev, response.data]);
            } else if (keywordType === 'WITNESS') {
                setMissingKeyword('');
                setMissingKeywords((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.error('키워드 추가 실패:', error);
            toast.error('키워드 추가에 실패했습니다.');
        } finally {
            setIsAddingKeyword(false);
        }
    };

    const handleDeleteKeyword = async (id: number, keywordType: 'ABANDONED' | 'WITNESS') => {
        setIsDeletingKeywordId(id);
        try {
            await deleteKeyword(id);
            if (keywordType === 'ABANDONED') {
                setAdoptKeywords((prev) => prev.filter((keyword) => keyword.id !== id));
            } else if (keywordType === 'WITNESS') {
                setMissingKeywords((prev) => prev.filter((keyword) => keyword.id !== id));
            }
        } catch (error) {
            console.error('키워드 삭제 실패:', error);
            toast.error('키워드 삭제에 실패했습니다.');
        } finally {
            setIsDeletingKeywordId(null);
        }
    };

    useEffect(() => {
        if (myKeywords) {
            const missing = myKeywords.filter((keyword) => keyword.keywordType === 'WITNESS');
            const adopt = myKeywords.filter((keyword) => keyword.keywordType === 'ABANDONED');

            setMissingKeywords(missing);
            setAdoptKeywords(adopt);
        }
    }, [myKeywords]);

    return {
        missingKeyword,
        missingKeywords,
        adoptKeyword,
        adoptKeywords,
        isAddingKeyword,
        isDeletingKeywordId,

        handleAddKeyword,
        handleDeleteKeyword,
        setMissingKeyword,
        setAdoptKeyword,
    };
};
