import Tag from '@/components/ui/tag';

interface AdoptLargeCardProps {
    name: string;
    species: string;
    age: string;
    tags: string[];
    location: string;
    image: string;
}

export function AdoptLargeCard({ name, species, age, tags, location, image }: AdoptLargeCardProps) {
    return (
        <div className="bg-gray-10 overflow-hidden rounded-lg">
            <div className="flex-shrink-0">
                <img src={image} alt={name} className="aspect-square w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 px-4 py-3">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">{name}</span>
                    <span className="text-gray-40 text-[0.75rem]">
                        {species} {age}살
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 2).map((tag) => (
                        <Tag key={tag} variant="default" size="sm">
                            {tag}
                        </Tag>
                    ))}
                    {tags.length > 2 && (
                        <Tag variant="default" size="sm">
                            {`+${tags.length - 2}`}
                        </Tag>
                    )}
                </div>
                <span className="text-gray-40 text-[0.75rem]">{location}</span>
            </div>
        </div>
    );
}
