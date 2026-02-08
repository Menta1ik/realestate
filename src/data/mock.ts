export type Area = {
  id: string
  nameEn: string
  nameRu: string
  teaserEn: string
  teaserRu: string
  priceFromAED: number
  roi?: string
}

export type UnitType = {
  kind: 'Studio' | '1BR' | '2BR' | '3BR' | 'Villa' | 'Townhouse'
  priceFromAED: number
  sizeFromSqFt?: number
}

export type PropertyType = 
  | 'apartment' | 'villa' | 'penthouse' | 'townhouse' | 'duplex' 
  | 'hotel_apartment' | 'whole_building' | 'shortterm_property' 
  | 'whole_floor' | 'half_floor' | 'commercial_property' 
  | 'commercial_showroom' | 'land_plot'

export type Amenity = 
  | 'builtin_wardrobes' | 'central_ac' | 'covered_parking' | 'shared_pool' 
  | 'sea_view' | 'maintenance' | 'supermarket' | 'beachfront' | 'public_parks' 
  | 'restaurant' | 'shared_gym' | 'balcony' | 'near_transport' | 'maids_room' 
  | 'concierge' | 'near_mall' | 'equipped_kitchen' | 'high_floor' | 'water_view' 
  | 'low_floor' | 'pets_allowed' | 'gym' | 'shared_spa' | 'landmark_view' 
  | 'study' | 'private_garden' | 'private_pool' | 'private_gym' | 'private_jacuzzi' 
  | 'builtin_wardrobe' | 'builtin_appliances' | 'maid_service' | 'kids_playground' 
  | 'kids_pool' | 'bbq_area' | 'cable_tv' | 'security' | 'bbq_facility'

export type Project = {
  id: string
  ref: string
  areaId: string
  nameEn: string
  nameRu: string
  developer: string
  status: 'Off-plan' | 'Ready'
  type: PropertyType
  handoverEn: string
  handoverRu: string
  priceFromAED: number
  paymentPlanEn: string
  paymentPlanRu: string
  tags: string[]
  descriptionEn: string
  descriptionRu: string
  specs: {
    bedrooms: number
    bathrooms: number
    sizeSqft: number
  }
  amenities: Amenity[]
  photos: string[]
  unitTypes: UnitType[]
  documents: { labelEn: string; labelRu: string; type: 'brochure' | 'floorplan' | 'paymentplan'; url: string }[]
}

export const tenant = {
  brandName: 'Dubai Homes Showcase',
  brandShort: 'DH',
  tagline: 'Fast подборки • Инвест-логика • WhatsApp за 1 клик',
  whatsapp: '+971501234567',
  telegram: 'DubaiHomesAgent'
}

export const areas: Area[] = [
  { id: 'marina', nameEn: 'Dubai Marina', nameRu: 'Дубай Марина', teaserEn: 'For lifestyle & rentals', teaserRu: 'Для жизни и аренды', priceFromAED: 1100000, roi: '6–8%' },
  { id: 'businessbay', nameEn: 'Business Bay', nameRu: 'Бизнес Бэй', teaserEn: 'Central, high liquidity', teaserRu: 'Центр, высокая ликвидность', priceFromAED: 900000, roi: '6–9%' },
  { id: 'downtown', nameEn: 'Downtown', nameRu: 'Даунтаун', teaserEn: 'Premium demand', teaserRu: 'Премиум спрос', priceFromAED: 1600000, roi: '4–6%' },
  { id: 'jvc', nameEn: 'JVC', nameRu: 'JVC', teaserEn: 'Affordable entry', teaserRu: 'Доступный вход', priceFromAED: 650000, roi: '7–10%' },
  { id: 'creek', nameEn: 'Dubai Creek Harbour', nameRu: 'Dubai Creek Harbour', teaserEn: 'Growth & views', teaserRu: 'Рост и виды', priceFromAED: 1200000, roi: '5–8%' },
]

export const projects: Project[] = [
  {
    id: 'celesto4',
    ref: 'CL-0041',
    areaId: 'businessbay',
    nameEn: 'Celesto 4',
    nameRu: 'Celesto 4',
    developer: 'Tarrad Developer',
    status: 'Off-plan',
    type: 'apartment',
    handoverEn: 'Q4 2028',
    handoverRu: '4 кв. 2028',
    priceFromAED: 790000,
    paymentPlanEn: '60/40',
    paymentPlanRu: '60/40',
    tags: ['Hot', 'New', 'Smart Home'],
    descriptionEn:
      'Modern tower with premium finishes, smart home package and fully furnished units. Strong investor appeal due to central location and flexible payment plan.',
    descriptionRu:
      'Современная башня с премиальной отделкой, smart home и полностью меблированными юнитами. Сильна для инвестора благодаря локации и гибкому плану оплаты.',
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      sizeSqft: 980
    },
    amenities: ['shared_pool', 'shared_gym', 'concierge', 'security', 'balcony'],
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000'
    ],
    unitTypes: [
      { kind: '1BR', priceFromAED: 790000, sizeFromSqFt: 690 },
      { kind: '2BR', priceFromAED: 1180000, sizeFromSqFt: 980 },
    ],
    documents: [
      { labelEn: 'Brochure (PDF)', labelRu: 'Брошюра (PDF)', type: 'brochure', url: 'https://example.com/brochure.pdf' },
      { labelEn: 'Floor Plans (PDF)', labelRu: 'Планировки (PDF)', type: 'floorplan', url: 'https://example.com/floorplans.pdf' },
      { labelEn: 'Payment Plan (PDF)', labelRu: 'План оплаты (PDF)', type: 'paymentplan', url: 'https://example.com/paymentplan.pdf' },
    ],
  },
  {
    id: 'marina-heights',
    ref: 'MH-9201',
    areaId: 'marina',
    nameEn: 'Marina Heights',
    nameRu: 'Marina Heights',
    developer: 'Emaar',
    status: 'Ready',
    type: 'apartment',
    handoverEn: 'Ready',
    handoverRu: 'Готово',
    priceFromAED: 1350000,
    paymentPlanEn: 'Cash / Mortgage',
    paymentPlanRu: 'Наличные / Ипотека',
    tags: ['Top', 'View', 'Ready'],
    descriptionEn:
      'Ready-to-move apartments with marina views. Great for end-users and short-term rentals.',
    descriptionRu:
      'Готовые квартиры с видом на марину. Подходит для проживания и краткосрочной аренды.',
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      sizeSqft: 1450
    },
    amenities: ['shared_pool', 'shared_gym', 'beachfront', 'near_mall', 'pets_allowed'],
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600596542815-e3287166183d?auto=format&fit=crop&q=80&w=1000'
    ],
    unitTypes: [
      { kind: 'Studio', priceFromAED: 980000, sizeFromSqFt: 430 },
      { kind: '1BR', priceFromAED: 1350000, sizeFromSqFt: 720 },
      { kind: '2BR', priceFromAED: 1980000, sizeFromSqFt: 1100 },
    ],
    documents: [
      { labelEn: 'Brochure (PDF)', labelRu: 'Брошюра (PDF)', type: 'brochure', url: 'https://example.com/brochure.pdf' },
      { labelEn: 'Floor Plans (PDF)', labelRu: 'Планировки (PDF)', type: 'floorplan', url: 'https://example.com/floorplans.pdf' },
    ],
  },
  {
    id: 'jvc-skyline',
    ref: 'JV-8823',
    areaId: 'jvc',
    nameEn: 'JVC Skyline',
    nameRu: 'JVC Skyline',
    developer: 'Damac',
    status: 'Off-plan',
    type: 'townhouse',
    handoverEn: 'Q2 2027',
    handoverRu: '2 кв. 2027',
    priceFromAED: 640000,
    paymentPlanEn: '50/50',
    paymentPlanRu: '50/50',
    tags: ['Best ROI', 'Affordable'],
    descriptionEn:
      'Affordable entry point with strong rental demand. Optimized layouts for investors.',
    descriptionRu:
      'Доступный вход с сильным спросом на аренду. Оптимальные планировки для инвесторов.',
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      sizeSqft: 2100
    },
    amenities: ['shared_pool', 'shared_gym', 'covered_parking', 'maids_room', 'balcony'],
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
    ],
    unitTypes: [
      { kind: 'Studio', priceFromAED: 640000, sizeFromSqFt: 410 },
      { kind: '1BR', priceFromAED: 820000, sizeFromSqFt: 680 },
      { kind: 'Townhouse', priceFromAED: 1450000, sizeFromSqFt: 1650 },
    ],
    documents: [
      { labelEn: 'Brochure (PDF)', labelRu: 'Брошюра (PDF)', type: 'brochure', url: 'https://example.com/brochure.pdf' },
    ],
  },
]

export const collections = [
  { id: 'top', titleEn: 'Top Projects', titleRu: 'Топ проекты', projectIds: ['marina-heights'] },
  { id: 'hot', titleEn: 'Hot Deals', titleRu: 'Горячие', projectIds: ['celesto4'] },
  { id: 'roi', titleEn: 'Best ROI', titleRu: 'Лучший ROI', projectIds: ['jvc-skyline'] },
  { id: 'ready', titleEn: 'Ready to Move', titleRu: 'Готовые', projectIds: ['marina-heights'] },
]

export function getAreaById(id: string) {
  return areas.find(a => a.id === id) ?? null
}

export function getProjectById(id: string) {
  return projects.find(p => p.id === id) ?? null
}

export function getDevelopers() {
  const set = new Set(projects.map(p => p.developer).filter(Boolean))
  return Array.from(set).sort((a,b) => a.localeCompare(b))
}

export function genLeadId() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 8; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
  return out
}
