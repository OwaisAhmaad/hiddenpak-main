import api from '../api';

export interface BlogQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export interface CreateBlogPayload {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  authorBio?: string;
  tags?: string[];
  published?: boolean;
  readTime?: string;
  image?: File;
}

function toBlogFormData(payload: CreateBlogPayload): FormData {
  const fd = new FormData();
  (Object.keys(payload) as (keyof CreateBlogPayload)[]).forEach((key) => {
    const val = payload[key];
    if (val === undefined || val === null) return;
    if (key === 'image' && val instanceof File) {
      fd.append('image', val);
    } else if (key === 'tags' && Array.isArray(val)) {
      val.forEach((t) => fd.append('tags[]', t));
    } else {
      fd.append(key, String(val));
    }
  });
  return fd;
}

export const blogsService = {
  getAll: (query: BlogQuery = {}) =>
    api.get('/blogs', { params: query }).then((r) => r.data),

  getBySlug: (slug: string) =>
    api.get(`/blogs/${slug}`).then((r) => r.data),

  create: (payload: CreateBlogPayload) =>
    api.post('/blogs', toBlogFormData(payload)).then((r) => r.data),

  update: (id: string, payload: Partial<CreateBlogPayload>) =>
    api.patch(`/blogs/${id}`, toBlogFormData(payload as CreateBlogPayload)).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/blogs/${id}`).then((r) => r.data),
};
