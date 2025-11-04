import Tag from '@/components/ui/tag';
import { Clock, MapPin } from 'lucide-react';

interface MissingProps {
    cardType: 'missing' | 'sighting';
    name: string;
    tags: string[];
    location: string;
    date: string;
    image: string;
}

export function MissingLargeCard({ cardType, name, tags, location, date, image }: MissingProps) {
    return (
        <div className="bg-gray-10 flex flex-col justify-center gap-4 p-4">
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <img src={image} alt={name} className="h-20 w-20 rounded-lg object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <div>
                        <Tag variant={cardType} size="sm">
                            {cardType === 'missing' ? '실종' : '목격'}
                        </Tag>
                    </div>
                    <span className="font-semibold">{name}</span>
                    <div className="text-gray-40 flex gap-2 text-[0.75rem]">
                        <span className="flex gap-1">
                            <MapPin strokeWidth={1} size={12 * 1.4} />
                            {location}
                        </span>
                        <span className="flex gap-1">
                            <Clock strokeWidth={1} size={12 * 1.4} />
                            {date}
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
