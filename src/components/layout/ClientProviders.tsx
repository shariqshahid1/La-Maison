'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      {children}
      {mounted && (
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0f172a',
              color: '#e2e8f0',
              border: '1px solid #10b981',
            },
          }}
        />
      )}
    </>
  );
}
