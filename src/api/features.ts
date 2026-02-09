import { apiClient } from './client';

export interface Feature {
  id: string;
  nameEn: string;
  nameRu: string;
  icon: string;
}

export const fetchAllFeatures = async (): Promise<Feature[]> => {
  const response = await apiClient.get<Feature[]>('/features');
  return response.data;
};
