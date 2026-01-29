import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AdoptCardSkeletonProps {
    className?: string;
}

export function AdoptCardSkeleton({ className }: AdoptCardSkeletonProps) {
    return (
        <div className={cn('w-full flex-shrink-0 rounded-lg bg-white', className)}>
            {/* 이미지 */}
            <Skeleton className="aspect-square w-full" />

            {/* 내용 */}
            <div className="flex flex-col gap-2 px-4 py-3">
                {/* 품종명 */}
                <Skeleton className="h-5 w-24" />

                {/* 나이 + 성별 */}
                <Skeleton className="h-4 w-16" />

                {/* 지역 */}
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
    );
}
