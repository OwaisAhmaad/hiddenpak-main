/**
 * API Helper - Proxies requests to the HiddenPak Backend API
 * 
 * The frontend no longer connects to any database directly.
 * All data operations go through the Express.js + MongoDB backend API.
 * 
 * Set NEXT_PUBLIC_API_URL in .env.local to point to your backend API.
 * Default: http://localhost:5000/api
 */

const RAW_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = (() => {
  const normalized = RAW_API_BASE_URL.replace(/\/$/, '');
  return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
})();

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

async function apiRequest<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    // Forward authorization header if present
    const authHeader = options.headers instanceof Headers 
      ? options.headers.get('Authorization')
      : (options.headers as Record<string, string>)?.['Authorization'];
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const res = await fetch(url, {
      ...options,
      headers,
    });

    const payload = await res.json();

    // Support both backend formats:
    // 1) { success, data, message }
    // 2) direct JSON payload (array/object)
    if (typeof payload === 'object' && payload !== null && 'success' in payload) {
      return payload as ApiResponse<T>;
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          (typeof payload === 'object' && payload !== null && 'message' in payload
            ? String((payload as { message?: unknown }).message)
            : `Request failed with status ${res.status}`),
      };
    }

    return { success: true, data: payload as T };
  } catch (error) {
    console.error(`API request failed for ${path}:`, error);
    return { success: false, message: 'Failed to connect to the API server. Make sure the backend is running.' };
  }
}

export const api = {
  get: <T = any>(path: string, headers?: Record<string, string>) =>
    apiRequest<T>(path, { method: 'GET', headers }),

  post: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body), headers }),

  put: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    apiRequest<T>(path, { method: 'PUT', body: JSON.stringify(body), headers }),

  patch: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body), headers }),

  delete: <T = any>(path: string, headers?: Record<string, string>) =>
    apiRequest<T>(path, { method: 'DELETE', headers }),
};

export { API_BASE_URL };
