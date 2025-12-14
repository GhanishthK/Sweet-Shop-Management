import api from './axios.config';
import type { Sweet } from '../types/index';

export const getSweetsApi = async (): Promise<Sweet[]> => {
  const response = await api.get('/sweets');
  return response.data;
};

export const getSweetByIdApi = async (id: string): Promise<Sweet> => {
  const response = await api.get(`/sweets/${id}`);
  return response.data;
};

export const searchSweetsApi = async (params: {
  name?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
}): Promise<Sweet[]> => {
  const response = await api.get('/sweets/search', { params });
  return response.data;
};

export const createSweetApi = async (sweet: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>): Promise<Sweet> => {
  const response = await api.post('/sweets', sweet);
  return response.data;
};

export const updateSweetApi = async (id: string, sweet: Partial<Sweet>): Promise<Sweet> => {
  const response = await api.put(`/sweets/${id}`, sweet);
  return response.data;
};

export const deleteSweetApi = async (id: string): Promise<void> => {
  await api.delete(`/sweets/${id}`);
};

export const purchaseSweetApi = async (id: string, quantity: number): Promise<Sweet> => {
  const response = await api.post(`/sweets/${id}/purchase`, { quantity });
  return response.data;
};

export const restockSweetApi = async (id: string, quantity: number): Promise<Sweet> => {
  const response = await api.post(`/sweets/${id}/restock`, { quantity });
  return response.data;
};