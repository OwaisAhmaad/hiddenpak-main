import api from '../api';

export const galleryService = {
  // ── Public ─────────────────────────────────────────────
  getAll: (page = 1, limit = 20) =>
    api.get('/gallery', { params: { page, limit } }).then((r) => r.data),

  // ── Admin (require Bearer token via Axios interceptor) ──
  // Do NOT set Content-Type manually — Axios sets multipart/form-data with boundary automatically
  upload: (
    file: File,
    meta: { alt?: string; caption?: string; location?: string; height?: string },
  ) => {
    const fd = new FormData();
    fd.append('image', file);
    if (meta.alt)      fd.append('alt',      meta.alt);
    if (meta.caption)  fd.append('caption',  meta.caption);
    if (meta.location) fd.append('location', meta.location);
    if (meta.height)   fd.append('height',   meta.height);
    return api.post('/admin/gallery', fd).then((r) => r.data);
  },

  remove: (id: string) =>
    api.delete(`/admin/gallery/${id}`).then((r) => r.data),
};
