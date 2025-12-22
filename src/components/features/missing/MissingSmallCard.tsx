import Tag from '@/components/ui/tag';
import { formatRelativeTime } from '@/lib/utils';
import { BoardData } from '@/types/board';

export function MissingSmallCard({
    title,
    animalType,
    breedType,
    tags,
    city,
    town,
    createdAt,
    profile,
}: BoardData) {
    const imageUrl = profile || '/logo-placeholder.webp';

    return (
        <div className="border-gray-20 flex items-center gap-4 rounded-lg border bg-white p-4">
            <div className="flex-shrink-0">
                <img src={imageUrl} alt={breedType} className="h-22 w-22 rounded-lg object-cover" />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <Tag variant={animalType} size="sm">
                        {animalType === 'MISSING' ? '실종' : '목격'}
                    </Tag>
                    <span className="font-semibold">{title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag} variant="default" size="sm">
                            {tag}
                        </Tag>
                    ))}
                </div>
                <span className="text-gray-40 text-[0.75rem]">
                    {city} {town} {formatRelativeTime(createdAt)}
                </span>
            </div>
        </div>
    );
}
