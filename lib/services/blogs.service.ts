import api from '../api';

export interface BlogQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export const blogsService = {
  getAll: (query: BlogQuery = {}) =>
    api.get('/blogs', { params: query }).then((r) => r.data),

  getBySlug: (slug: string) =>
    api.get(`/blogs/${slug}`).then((r) => r.data),

  create: (formData: FormData) =>
    api.post('/blogs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),

  update: (id: string, formData: FormData) =>
    api.patch(`/blogs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/blogs/${id}`).then((r) => r.data),
};
