import { Skeleton } from '@/components/ui/skeleton';

export function MissingSmallCardSkeleton() {
    return (
        <div className="flex items-center gap-4 rounded-lg bg-white p-4">
            {/* 이미지 */}
            <Skeleton className="h-22 w-22 flex-shrink-0 rounded-lg" />

            {/* 내용 */}
            <div className="flex flex-1 flex-col gap-3">
                {/* 태그 + 제목 */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-5 w-32" />
                </div>

                {/* 태그들 */}
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                </div>

                {/* 지역 + 시간 */}
                <Skeleton className="h-3 w-40" />
            </div>
        </div>
    );
}
