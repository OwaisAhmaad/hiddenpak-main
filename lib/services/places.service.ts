import api from '../api';

export interface PlaceQuery {
  page?: number;
  limit?: number;
  search?: string;
  region?: string;
  category?: string;
}

export const placesService = {
  getAll: (query: PlaceQuery = {}) =>
    api.get('/places', { params: query }).then((r) => r.data),

  getBySlug: (slug: string) =>
    api.get(`/places/${slug}`).then((r) => r.data),

  create: (formData: FormData) =>
    api.post('/places', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),

  update: (id: string, formData: FormData) =>
    api.patch(`/places/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),

  addGalleryImage: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post(`/places/${id}/gallery`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },

  remove: (id: string) =>
    api.delete(`/places/${id}`).then((r) => r.data),
};
