import api from '../api';

export const galleryService = {
  getAll: (page = 1, limit = 20) =>
    api.get('/gallery', { params: { page, limit } }).then((r) => r.data),

  upload: (file: File, meta: { alt?: string; location?: string; height?: string }) => {
    const fd = new FormData();
    fd.append('image', file);
    if (meta.alt) fd.append('alt', meta.alt);
    if (meta.location) fd.append('location', meta.location);
    if (meta.height) fd.append('height', meta.height);
    return api.post('/gallery', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },

  remove: (id: string) =>
    api.delete(`/gallery/${id}`).then((r) => r.data),
};
