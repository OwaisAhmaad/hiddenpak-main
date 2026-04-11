import api from '../api';

export interface PlaceQuery {
  page?: number;
  limit?: number;
  search?: string;
  region?: string;
  category?: string;
}

export const placesService = {
  // ── Public ─────────────────────────────────────────────
  getAll: (query: PlaceQuery = {}) =>
    api.get('/places', { params: query }).then((r) => r.data),

  getBySlug: (slug: string) =>
    api.get(`/places/${slug}`).then((r) => r.data),

  // ── Admin (require Bearer token via Axios interceptor) ──
  // Do NOT set Content-Type manually — Axios sets multipart/form-data with boundary automatically
  create: (formData: FormData) =>
    api.post('/admin/places', formData).then((r) => r.data),

  update: (id: string, formData: FormData) =>
    api.patch(`/admin/places/${id}`, formData).then((r) => r.data),

  addGalleryImage: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post(`/admin/places/${id}/gallery`, fd).then((r) => r.data);
  },

  remove: (id: string) =>
    api.delete(`/admin/places/${id}`).then((r) => r.data),
};
