import axiosInstance from '@/lib/axios';
import type {
    AdoptAnimal,
    AdoptAnimalDetail,
    adoptFetchParams,
    AdoptAnimalsResponse,
    CursorPageResponse,
} from '@/types/adopt';

export const fetchAdoptAnimals = async (
    params: adoptFetchParams
): Promise<CursorPageResponse<AdoptAnimal>> => {
    const { data } = await axiosInstance.get<AdoptAnimalsResponse>('/animal/list', { params });
    console.log(data);
    return data.data.animal;
};

export const fetchAdoptAnimalsById = async (id: number): Promise<AdoptAnimalDetail> => {
    const { data } = await axiosInstance.get(`/animal/${id}`);
    return data;
};
