import axios from 'axios';

const api = axios.create({
  // Use relative URLs so requests resolve against the current origin.
  // This works in both local dev and production (Vercel) without needing
  // NEXT_PUBLIC_APP_URL to point at a specific host.
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    // Only redirect on 401 for protected resources. Never redirect for the
    // auth endpoints themselves (login, signup, me) so their errors can be
    // handled by the calling page instead of a forced navigation.
    if (
      error.response?.status === 401 &&
      !url.includes('/api/auth/')
    ) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
