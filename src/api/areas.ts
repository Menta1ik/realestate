import { apiClient as client } from './client'
import { Area } from '../data/mock'

export async function getAreas() {
  const res = await client.get<Area[]>('/areas')
  return res.data
}

export async function getArea(id: string) {
  const res = await client.get<Area>(`/areas/${id}`)
  return res.data
}
