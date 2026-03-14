import axiosInstance from '@/lib/axios';
import type {
    AdoptAnimalDetail,
    AnimalFetchParams,
    AdoptAnimalsResponse,
    AnimalMapFetchparams,
} from '@/types/animal';
import { ServerResponseType } from '@/types/common';

export const fetchAdoptAnimals = async (
    params: AnimalFetchParams
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

export const fetchAnimalMap = async (
    params: AnimalMapFetchparams
): Promise<ServerResponseType<AdoptAnimalsResponse>> => {
    const { data } = await axiosInstance.get('/animal/list/map', { params });
    return data;
};
