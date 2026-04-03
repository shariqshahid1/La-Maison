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
}));

// Initialize auth state on client side
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    // Fetch user info on load
    import('@/utils/api').then(({ default: api }) => {
      api
        .get('/api/auth/me')
        .then((res) => {
          useAuthStore.getState().setUser(res.data.user);
          useAuthStore.getState().setToken(token);
        })
        .catch(() => {
          useAuthStore.getState().logout();
        });
    });
  }
}
