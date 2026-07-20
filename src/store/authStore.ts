import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,

  setUser: (user) =>
    set({ user, isAdmin: user?.role === 'admin' }),

  setToken: (token) =>
    set({ token, isAuthenticated: !!token }),

  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({
      user,
      token,
      isAuthenticated: true,
      isAdmin: user.role === 'admin',
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  initializeAuth: () => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('token');
    if (token) {
      import('@/utils/api').then(({ default: api }) => {
        api
          .get('/api/auth/me')
          .then((res) => {
            set({
              user: res.data.user,
              token,
              isAuthenticated: true,
              isAdmin: res.data.user?.role === 'admin',
            });
          })
          .catch(() => {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isAdmin: false,
            });
          });
      });
    }
  },
}));
