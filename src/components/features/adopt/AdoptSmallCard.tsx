interface AdoptSmallCardProps {
    name: string;
    species: string;
    age: string;
    image: string;
}

export function AdoptSmallCard({ name, species, age, image }: AdoptSmallCardProps) {
    return (
        <div className="flex-shrink-0 overflow-hidden rounded-lg bg-white">
            <div className="flex-shrink-0">
                <img src={image} alt={name} className="h-32.5 w-32.5 object-cover" />
            </div>
            <div className="flex flex-col gap-1 px-4 py-3">
                <span className="font-semibold">{name}</span>
                <span className="text-gray-40 text-[0.75rem]">
                    {species} {age}살
                </span>
            </div>
        </div>
    );
}
