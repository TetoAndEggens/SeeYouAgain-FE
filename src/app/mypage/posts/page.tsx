'use client';

import React from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/layout/Selector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    MissingLargeCardProps,
    MissingLargeCard,
} from '@/components/features/missing/MissingLargeCard';
import { Trash2, CircleX } from 'lucide-react';
import { useMyPost } from '@/hook/board/useBoardPost';

const MyPostsPage = () => {
    const { data, boardCount, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useMyPost({
            cursorId: null,
            size: 10,
            sortDirection: 'LATEST',
        });

    const [useCheck, setUseCheck] = React.useState(false);
    const [checkAll, setCheckAll] = React.useState(false);
    const [checkItem, setCheckItem] = React.useState<boolean[]>([]);

    const [deletedBoardIds, setDeletedBoardIds] = React.useState<Set<number>>(new Set());

    const visibleData = React.useMemo(() => {
        if (deletedBoardIds.size === 0) return data;
        return data.filter((item) => !deletedBoardIds.has(item.boardId));
    }, [data, deletedBoardIds]);

    React.useEffect(() => {
        setCheckItem(Array.from({ length: visibleData.length }, () => false));
        setCheckAll(false);
    }, [visibleData.length]);

    const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const el = loadMoreRef.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                fetchNextPage();
            }
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    // 전체 선택
    const handleToggleAll = React.useCallback(
        (checked: boolean) => {
            setCheckItem(Array.from({ length: visibleData.length }, () => checked));
        },
        [visibleData.length]
    );

    // 개별 선택
    const handleToggleItem = React.useCallback((index: number, checked: boolean) => {
        setCheckItem((prev) => {
            const next = [...prev];
            next[index] = checked;
            return next;
        });
    }, []);

    // 선택 모드 취소
    const handleCancelSelectMode = React.useCallback(() => {
        setUseCheck(false);
        setCheckAll(false);
        setCheckItem(Array.from({ length: visibleData.length }, () => false));
    }, [visibleData.length]);

    // 선택 삭제
    const itemDelete = React.useCallback(() => {
        const selectedIds = visibleData
            .filter((_, i) => checkItem[i] === true)
            .map((item) => item.boardId);

        setDeletedBoardIds((prev) => {
            const next = new Set(prev);
            selectedIds.forEach((id) => next.add(id));
            return next;
        });

        setUseCheck(false);
        setCheckAll(false);
        setCheckItem(Array.from({ length: visibleData.length }, () => false));
    }, [checkItem, visibleData]);

    if (isLoading) {
        return <div className="p-5">로딩 중입니다.</div>;
    }

    if (isError) {
        return <div className="p-5">불러오기에 실패했습니다.</div>;
    }

    const Card = React.memo(function Card({ data }: { data: typeof visibleData }) {
        return (
            <>
                {data.map((item, index) => (
                    <div key={`posts-${item.boardId}`} className="flex items-center gap-3">
                        {useCheck && (
                            <Checkbox
                                checked={checkItem[index] ?? false}
                                className="size-6"
                                onCheckedChange={(checked) => {
                                    const nextChecked = checked === true;
                                    handleToggleItem(index, nextChecked);
                                }}
                            />
                        )}

                        {useCheck ? (
                            <div className="w-full cursor-pointer select-none">
                                <MissingLargeCard {...(item as unknown as MissingLargeCardProps)} />
                            </div>
                        ) : (
                            <Link href={`/posts/${item.boardId}`} className="w-full">
                                <MissingLargeCard {...(item as unknown as MissingLargeCardProps)} />
                            </Link>
                        )}
                    </div>
                ))}
            </>
        );
    });

    return (
        <div className="flex w-full flex-col gap-4 p-5">
            <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
                <div className="flex w-full justify-start gap-1">
                    총 <p className="text-[#FFB84D]">{boardCount}건</p>의 게시글
                </div>

                <div className="flex w-full justify-end">
                    <div className="flex items-center gap-2">
                        {!useCheck && (
                            <>
                                <CustomSelect
                                    options={[
                                        {
                                            items: [
                                                { value: '실종', name: '실종' },
                                                { value: '목격', name: '목격' },
                                            ],
                                        },
                                    ]}
                                    placeholder="실종"
                                    defaultValue="실종"
                                />
                                <CustomSelect
                                    options={[
                                        {
                                            items: [
                                                { value: '최신순', name: '최신순' },
                                                { value: '오래된 순', name: '오래된 순' },
                                            ],
                                        },
                                    ]}
                                    placeholder="최신순"
                                    defaultValue="최신순"
                                />
                            </>
                        )}

                        <Button
                            className="bg-destructive flex items-center"
                            size="sm"
                            onClick={() => {
                                if (!useCheck) setUseCheck(true);
                                else itemDelete();
                            }}
                        >
                            <Trash2 />
                            <p>삭제</p>
                        </Button>

                        {useCheck && (
                            <Button
                                className="flex items-center bg-black"
                                size="sm"
                                onClick={handleCancelSelectMode}
                            >
                                <CircleX />
                                <p>취소</p>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div>
                {useCheck && (
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={checkAll}
                                className="size-6"
                                onCheckedChange={(checked) => {
                                    const nextChecked = checked === true;
                                    setCheckAll(nextChecked);
                                    handleToggleAll(nextChecked);
                                }}
                            />
                            <p>전체삭제</p>
                        </div>
                        <div />
                    </div>
                )}

                <Card data={visibleData} />

                {hasNextPage && <div ref={loadMoreRef} className="h-1" />}
            </div>
        </div>
    );
};

export default MyPostsPage;
