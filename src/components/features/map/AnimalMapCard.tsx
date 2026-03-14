import Tag from '@/components/ui/tag';
import { calculateAgeFromYear } from '@/lib/date-utils';
import { formatRelativeTime } from '@/lib/utils';
import type { AdoptAnimal } from '@/types/animal';
import { Mars, Venus } from 'lucide-react';

interface AnimalMapCardProps {
    animal: AdoptAnimal;
}

export function AnimalMapCard({ animal }: AnimalMapCardProps) {
    const { profile, animalType, breedType, birth, sex, city, town, processState, happenDate } =
        animal;

    // 이미지 fallback 처리
    const imageUrl = profile || '/logo-placeholder.webp';

    // 나이 계산
    const age = calculateAgeFromYear(Number(birth.slice(0, 4)));

    // 동물 타입 한글 변환
    const animalTypeLabel = {
        ABANDONED: '입양',
        MISSING: '실종',
        WITNESS: '목격',
    };

    return (
        <div className="border-gray-20 flex items-center gap-4 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md">
            {/* 이미지 */}
            <div className="flex-shrink-0">
                <img src={imageUrl} alt={breedType} className="h-22 w-22 rounded-lg object-cover" />
            </div>

            {/* 정보 */}
            <div className="flex flex-1 flex-col gap-2">
                {/* 타입 & 품종 */}
                <div className="flex items-center gap-2">
                    <Tag variant="default" size="sm">
                        {animalTypeLabel[animalType]}
                    </Tag>
                    <span className="font-semibold">{breedType}</span>
                </div>

                {/* 나이 & 성별 */}
                <div className="text-gray-40 flex items-center gap-1 text-[0.875rem]">
                    <span>{age}살</span>
                    {sex === 'M' ? (
                        <Mars size={16} color="#3B82F6" />
                    ) : (
                        <Venus size={16} color="#EC4899" />
                    )}
                    <span className="ml-1">·</span>
                    <span>{processState}</span>
                </div>

                {/* 지역 & 날짜 */}
                <div className="text-gray-40 flex items-center gap-1 text-[0.75rem]">
                    <span>
                        {city} {town}
                    </span>
                    <span>·</span>
                    <span>{formatRelativeTime(happenDate)}</span>
                </div>
            </div>
        </div>
    );
}
