import api from '../api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  type: 'village' | 'city' | 'other';
  description?: string;
}

export interface CreateCategoryPayload {
  name: string;
  type: 'village' | 'city' | 'other';
  slug?: string;
  description?: string;
}

export const categoriesService = {
  getAll: (type?: string) =>
    api.get('/categories', { params: type ? { type } : {} }).then((r) => r.data),

  create: (payload: CreateCategoryPayload) =>
    api.post('/admin/categories', payload).then((r) => r.data),

  update: (id: string, payload: Partial<CreateCategoryPayload>) =>
    api.patch(`/admin/categories/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/admin/categories/${id}`).then((r) => r.data),
};
