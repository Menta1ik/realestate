import { apiClient } from './client';
import { Project, Amenity } from '../data/mock';

export interface Developer {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  slug: string;
  year?: number;
  office?: string;
  description?: string;
  descriptionEn?: string;
  descriptionRu?: string;
  projects?: Project[];
}

// Helper to map backend project to frontend Project
const mapBackendProject = (bp: any): Project => ({
  id: bp.id,
  ref: bp.ref,
  areaId: bp.areaId,
  nameEn: bp.nameEn,
  nameRu: bp.nameRu,
  developer: bp.developer,
  status: bp.status as 'Off-plan' | 'Ready',
  type: bp.type as any,
  handoverEn: bp.handoverEn,
  handoverRu: bp.handoverRu,
  priceFromAED: bp.priceFromAED,
  paymentPlanEn: bp.paymentPlanEn,
  paymentPlanRu: bp.paymentPlanRu,
  tags: (bp.tags || []).map((t: any) => t.name),
  descriptionEn: bp.descriptionEn,
  descriptionRu: bp.descriptionRu,
  specs: {
    bedrooms: parseInt(bp.bedrooms) || 0,
    bathrooms: parseInt(bp.bathrooms) || 0,
    sizeSqft: parseInt(bp.size) || 0,
  },
  amenities: (bp.amenities || []).map((a: any) => a.code as Amenity),
  photos: (bp.photos || []).map((p: any) => p.url),
  unitTypes: (bp.unitTypes || []).map((u: any) => ({
    kind: u.kind as any,
    priceFromAED: u.priceFromAED,
    sizeFromSqFt: u.sizeFromSqFt
  })),
  documents: (bp.documents || []).map((d: any) => ({
    labelEn: d.labelEn,
    labelRu: d.labelRu,
    type: d.type as any,
    url: d.url
  }))
});

export const fetchDevelopers = async (): Promise<Developer[]> => {
  const response = await apiClient.get<any[]>('/developers');
  return response.data.map((d: any) => ({
    ...d,
    projects: (d.projects || []).map(mapBackendProject)
  }));
};

export const fetchDeveloperById = async (id: string): Promise<Developer> => {
  const response = await apiClient.get<any>(`/developers/${id}`);
  const d = response.data;
  return {
    ...d,
    projects: (d.projects || []).map(mapBackendProject)
  };
};
