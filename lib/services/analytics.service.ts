import api from '../api';

export interface AnalyticsSummary {
  totalBlogs: number;
  totalPlaces: number;
  totalUsers: number;
  monthlyNewBlogs: Array<{ _id: { year: number; month: number }; count: number }>;
  monthlyNewUsers: Array<{ _id: { year: number; month: number }; count: number }>;
}

export const analyticsService = {
  getSummary: () => api.get('/admin/analytics').then((r) => r.data),
};
