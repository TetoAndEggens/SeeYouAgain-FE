import axiosInstance from '@/lib/axios';
import type { AdoptAnimalDetail, animalFetchParams, AdoptAnimalsResponse } from '@/types/adopt';
import { ServerResponseType } from '@/types/common';

export const fetchAdoptAnimals = async (
    params: animalFetchParams
): Promise<ServerResponseType<AdoptAnimalsResponse>> => {
    const { data } = await axiosInstance.get('/animal/list', { params });
    return data;
};

export const fetchAdoptAnimalsById = async (
    id: number
): Promise<ServerResponseType<AdoptAnimalDetail>> => {
    const { data } = await axiosInstance.get(`/animal/${id}`);
    return data;
};
