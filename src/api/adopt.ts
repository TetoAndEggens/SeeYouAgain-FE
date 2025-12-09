import axiosInstance from '@/lib/axios';
import type { AdoptAnimalDetail, animalFetchParams, AdoptAnimalsResponse } from '@/types/adopt';

export const fetchAdoptAnimals = async (
    params: animalFetchParams
): Promise<AdoptAnimalsResponse> => {
    const { data } = await axiosInstance.get<AdoptAnimalsResponse>('/animal/list', { params });
    return data;
};

export const fetchAdoptAnimalsById = async (id: number): Promise<AdoptAnimalDetail> => {
    const { data } = await axiosInstance.get(`/animal/${id}`);
    return data.data;
};
