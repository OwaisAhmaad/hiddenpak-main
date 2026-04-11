import api from '../api';

export interface AdminProfile {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UpdateProfilePayload {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface SiteSettings {
  siteName?: string;
  siteTagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  maintenanceMode?: boolean;
  allowRegistration?: boolean;
}

export const adminService = {
  getProfile: () =>
    api.get('/admin/profile').then((r) => r.data),

  updateProfile: (payload: UpdateProfilePayload) =>
    api.put('/admin/profile', payload).then((r) => r.data),

  getSettings: () =>
    api.get('/admin/settings').then((r) => r.data),

  updateSettings: (payload: SiteSettings) =>
    api.patch('/admin/settings', payload).then((r) => r.data),
};
