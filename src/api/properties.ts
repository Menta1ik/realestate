import { apiClient } from './client';
import { Project, Amenity } from '../data/mock';

// Types representing the backend response structure (same as Project for now)
interface BackendProperty {
  id: string;
  ref: string;
  areaId: string;
  nameEn: string;
  nameRu: string;
  developer: string;
  status: string;
  type: string;
  handoverEn: string;
  handoverRu: string;
  priceFromAED: number;
  paymentPlanEn: string;
  paymentPlanRu: string;
  descriptionEn: string;
  descriptionRu: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  photos: { url: string }[];
  amenities: { code: string }[];
  tags: { name: string }[];
  unitTypes: { kind: string; priceFromAED: number; sizeFromSqFt: number }[];
  documents: { labelEn: string; labelRu: string; type: string; url: string }[];
  area: {
    id: string;
    nameEn: string;
    nameRu: string;
    teaserEn: string;
    teaserRu: string;
    priceFromAED: number;
    roi: string;
  };
}

// Reusing Project type since Property is a duplicate in structure
export const fetchProperties = async (): Promise<Project[]> => {
  const response = await apiClient.get<BackendProperty[]>('/properties');
  
  return response.data.map(bp => ({
    id: bp.id,
    ref: bp.ref,
    areaId: bp.areaId,
    nameEn: bp.nameEn,
    nameRu: bp.nameRu,
    developer: bp.developer,
    status: bp.status as 'Off-plan' | 'Ready',
    type: bp.type as any, // Cast to PropertyType
    handoverEn: bp.handoverEn,
    handoverRu: bp.handoverRu,
    priceFromAED: bp.priceFromAED,
    paymentPlanEn: bp.paymentPlanEn,
    paymentPlanRu: bp.paymentPlanRu,
    tags: bp.tags.map(t => t.name),
    descriptionEn: bp.descriptionEn,
    descriptionRu: bp.descriptionRu,
    specs: {
      bedrooms: parseInt(bp.bedrooms) || 0,
      bathrooms: parseInt(bp.bathrooms) || 0,
      sizeSqft: parseInt(bp.size) || 0,
    },
    amenities: bp.amenities.map(a => a.code as Amenity),
    photos: bp.photos.map(p => p.url),
    unitTypes: bp.unitTypes.map(u => ({
      kind: u.kind as any,
      priceFromAED: u.priceFromAED,
      sizeFromSqFt: u.sizeFromSqFt
    })),
    documents: bp.documents.map(d => ({
      labelEn: d.labelEn,
      labelRu: d.labelRu,
      type: d.type as any,
      url: d.url
    }))
  }));
};

export const fetchPropertyById = async (id: string): Promise<Project | null> => {
  try {
    const response = await apiClient.get<BackendProperty>(`/properties/${id}`);
    const bp = response.data;
    
    return {
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
      tags: bp.tags.map(t => t.name),
      descriptionEn: bp.descriptionEn,
      descriptionRu: bp.descriptionRu,
      specs: {
        bedrooms: parseInt(bp.bedrooms) || 0,
        bathrooms: parseInt(bp.bathrooms) || 0,
        sizeSqft: parseInt(bp.size) || 0,
      },
      amenities: bp.amenities.map(a => a.code as Amenity),
      photos: bp.photos.map(p => p.url),
      unitTypes: bp.unitTypes.map(u => ({
        kind: u.kind as any,
        priceFromAED: u.priceFromAED,
        sizeFromSqFt: u.sizeFromSqFt
      })),
      documents: bp.documents.map(d => ({
        labelEn: d.labelEn,
        labelRu: d.labelRu,
        type: d.type as any,
        url: d.url
      }))
    };
  } catch (error) {
    console.error('Failed to fetch property:', error);
    return null;
  }
};
