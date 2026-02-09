import { apiClient } from './client';

export interface Developer {
  id: string;
  name: string;
  slug: string;
  year?: number;
  office?: string;
  description?: string;
  projects?: any[];
}

export const fetchDevelopers = async (): Promise<Developer[]> => {
  const response = await apiClient.get<Developer[]>('/developers');
  return response.data;
};

export const fetchDeveloperById = async (id: string): Promise<Developer> => {
  const response = await apiClient.get<Developer>(`/developers/${id}`);
  return response.data;
};
