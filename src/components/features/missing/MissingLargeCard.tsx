import Tag from '@/components/ui/tag';
import { formatRelativeTime } from '@/lib/utils';
import { Clock, MapPin } from 'lucide-react';

type MissingLargeCardProps = {
    title: string;
    animalType: 'MISSING' | 'WITNESS';
    breedType: string;
    tags: string[];
    city: string;
    town: string;
    createdAt: string;
    profile: string;
};

export function MissingLargeCard({
    title,
    animalType,
    breedType,
    tags,
    city,
    town,
    createdAt,
    profile,
}: MissingLargeCardProps) {
    const imageUrl = profile || '/logo-placeholder.webp';

    return (
        <div className="border-gray-20 flex flex-col justify-center gap-4 rounded-lg border bg-white p-4">
            <div className="flex gap-4">
                <div className="shrink-0">
                    <img
                        src={imageUrl}
                        alt={breedType}
                        className="h-20 w-20 rounded-lg object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <div>
                        <Tag variant={animalType} size="sm">
                            {animalType === 'MISSING' ? '실종' : '목격'}
                        </Tag>
                    </div>
                    <span className="font-semibold">{title}</span>
                    <div className="text-gray-40 flex gap-2 text-[0.75rem]">
                        <span className="flex gap-1">
                            <MapPin strokeWidth={1} size={12 * 1.4} />
                            {city} {town}
                        </span>
                        <span className="flex gap-1">
                            <Clock strokeWidth={1} size={12 * 1.4} />
                            {formatRelativeTime(createdAt)}
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex gap-2">
                {tags.map((tag) => (
                    <Tag key={tag} variant="default" size="sm">
                        {tag}
                    </Tag>
                ))}
            </div>
        </div>
    );
}
