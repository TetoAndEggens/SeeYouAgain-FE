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
        <div className="bg-gray-10 flex gap-4 items-center p-4">
            <img src={image} className="rounded-lg"></img>
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
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
