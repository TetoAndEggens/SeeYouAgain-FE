import Tag from '@/components/ui/tag';

interface MissingProps {
    cardType: 'missing' | 'sighting';
    name: string;
    tags: string[];
    location: string;
    date: string;
    image: string;
}

export function MissingSmallCard({ cardType, name, tags, location, date, image }: MissingProps) {
    return (
        <div className="border-gray-20 flex items-center gap-4 rounded-lg border bg-white p-4">
            <div className="flex-shrink-0">
                <img src={image} alt={name} className="h-22 w-22 rounded-lg object-cover" />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <Tag variant={cardType} size="sm">
                        {cardType === 'missing' ? '실종' : '목격'}
                    </Tag>
                    <span className="font-semibold">{name}</span>
                </div>
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag} variant="default" size="sm">
                            {tag}
                        </Tag>
                    ))}
                </div>
                <span className="text-gray-40 text-[0.75rem]">
                    {location} {date}
                </span>
            </div>
        </div>
    );
}
