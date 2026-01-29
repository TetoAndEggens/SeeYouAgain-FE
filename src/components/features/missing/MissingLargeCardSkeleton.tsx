import { Skeleton } from '@/components/ui/skeleton';

export function MissingLargeCardSkeleton() {
    return (
        <div className="border-gray-20 flex flex-col justify-center gap-4 rounded-lg border bg-white p-4">
            <div className="flex gap-4">
                {/* 이미지 */}
                <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />

                {/* 우측 정보 영역 */}
                <div className="flex flex-col justify-center gap-2">
                    {/* 태그 (실종/목격) */}
                    <Skeleton className="h-6 w-12" />

                    {/* 제목 */}
                    <Skeleton className="h-5 w-40" />

                    {/* 위치 + 시간 정보 */}
                    <div className="flex gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            </div>

            {/* 구분선 */}
            <hr />

            {/* 태그들 */}
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>
        </div>
    );
}
