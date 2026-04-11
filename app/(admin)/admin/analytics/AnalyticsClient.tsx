"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { analyticsService } from '@/lib/services/analytics.service';

function formatMonthLabel(obj: { year: number; month: number }) {
  const dt = new Date(obj.year, obj.month - 1, 1);
  return dt.toLocaleString(undefined, { month: 'short', year: 'numeric' });
}

export default function AnalyticsClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    analyticsService
      .getSummary()
      .then((r) => setSummary(r.data))
      .catch((e) => setError(e?.response?.data?.message ?? 'Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell title="Analytics">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 p-6">Loading analytics…</div>
        ) : error ? (
          <div className="col-span-3 p-6 text-red-400">{error}</div>
        ) : (
          <>
            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 className="text-sm text-gray-400">Total Blogs</h3>
              <p className="text-2xl font-semibold mt-2">{summary.totalBlogs}</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 className="text-sm text-gray-400">Total Places</h3>
              <p className="text-2xl font-semibold mt-2">{summary.totalPlaces}</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 className="text-sm text-gray-400">Total Users</h3>
              <p className="text-2xl font-semibold mt-2">{summary.totalUsers}</p>
            </div>

            <div className="sm:col-span-2 p-6 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-4">New Blogs (last 6 months)</h3>
              <div className="space-y-2">
                {summary.monthlyNewBlogs.length === 0 && <div className="text-gray-500">No recent data.</div>}
                {summary.monthlyNewBlogs.map((m: any) => (
                  <div key={`${m._id.year}-${m._id.month}`} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-gray-300">{formatMonthLabel(m._id)}</div>
                    <div className="flex-1 bg-gray-800 rounded overflow-hidden h-4">
                      <div
                        className="bg-emerald-500 h-4"
                        style={{ width: `${Math.min(100, (m.count / (summary.totalBlogs || 1)) * 100)}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm text-gray-300">{m.count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-4">New Users (last 6 months)</h3>
              <div className="space-y-2">
                {summary.monthlyNewUsers.length === 0 && <div className="text-gray-500">No recent data.</div>}
                {summary.monthlyNewUsers.map((m: any) => (
                  <div key={`u-${m._id.year}-${m._id.month}`} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-300">{formatMonthLabel(m._id)}</div>
                    <div className="flex-1 bg-gray-800 rounded overflow-hidden h-3">
                      <div
                        className="bg-blue-500 h-3"
                        style={{ width: `${Math.min(100, (m.count / (summary.totalUsers || 1)) * 100)}%` }}
                      />
                    </div>
                    <div className="w-10 text-right text-sm text-gray-300">{m.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
