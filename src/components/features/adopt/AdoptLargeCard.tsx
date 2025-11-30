import Tag from '@/components/ui/tag';
import { calculateAgeFromYear } from '@/lib/date-utils';
import type { AdoptAnimal } from '@/types/adopt';
import { Mars, Venus } from 'lucide-react';

// export type AdoptAnimal = {
//     animalId: number;
//     happenDate: string;
//     species: 'DOG' | 'CAT';
//     breedType: string;
//     birth: string;
//     city: string;
//     town: string;
//     sex: 'M' | 'F' | 'Q';
//     processState: string;
//     profile: string;
//     animalType: 'ABANDONED';
// };

export function AdoptLargeCard({ breedType, birth, sex, city, town, profile }: AdoptAnimal) {
    return (
        <div className="overflow-hidden rounded-lg bg-white">
            <div className="flex-shrink-0">
                <img src={profile} alt={breedType} className="aspect-square w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 px-4 py-3">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">{breedType}</span>
                    <div className="text-gray-40 flex gap-1 text-[0.75rem]">
                        {calculateAgeFromYear(Number(birth.slice(0, 4)))}살{' '}
                        {sex === 'M' ? (
                            <Mars size={16} color="#3B82F6" />
                        ) : (
                            <Venus size={16} color="#EC4899" />
                        )}
                    </div>
                </div>
                <span className="text-gray-40 text-[0.75rem]">
                    {city} {town}
                </span>
            </div>
        </div>
    );
}
