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
  excerpt?: string;
  content: string;
  category?: string;
  categoryId?: string;
  status?: 'draft' | 'published';
  author?: string;
  authorBio?: string;
  tags?: string[];
  published?: boolean;
  readTime?: string;
  /** Field name for backend: coverImage */
  coverImage?: File;
}

function toBlogFormData(payload: CreateBlogPayload): FormData {
  const fd = new FormData();
  (Object.keys(payload) as (keyof CreateBlogPayload)[]).forEach((key) => {
    const val = payload[key];
    if (val === undefined || val === null) return;
    if (key === 'coverImage' && val instanceof File) {
      fd.append('coverImage', val);          // matches FileInterceptor('coverImage')
    } else if (key === 'tags' && Array.isArray(val)) {
      val.forEach((t) => fd.append('tags[]', t));
    } else {
      fd.append(key, String(val));
    }
  });
  return fd;
}

export const blogsService = {
  // ── Public ─────────────────────────────────────────────
  getAll: (query: BlogQuery = {}) =>
    api.get('/blogs', { params: query }).then((r) => r.data),

  getBySlug: (slug: string) =>
    api.get(`/blogs/${slug}`).then((r) => r.data),

  // ── Admin (require Bearer token via Axios interceptor) ──
  /** Fetch all blogs including drafts — for admin dashboard */
  adminGetAll: (query: BlogQuery = {}) =>
    api.get('/admin/blogs', { params: query }).then((r) => r.data),

  adminGetById: (id: string) =>
    api.get(`/admin/blogs/${id}`).then((r) => r.data),

  create: (payload: CreateBlogPayload) =>
    api.post('/admin/blogs', toBlogFormData(payload)).then((r) => r.data),

  update: (id: string, payload: Partial<CreateBlogPayload>) =>
    api.patch(`/admin/blogs/${id}`, toBlogFormData(payload as CreateBlogPayload)).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/admin/blogs/${id}`).then((r) => r.data),
};
