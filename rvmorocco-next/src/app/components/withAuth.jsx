'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { loggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Only redirect AFTER auth check is complete
      if (!loading && !loggedIn) {
        router.replace('/login');
      }
    }, [loading, loggedIn, router]);

    // ── While validating the token, show a full-screen spinner ────────────
    if (loading) {
      return (
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#0B0E11',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '4px solid rgba(240, 185, 11, 0.2)',
              borderTop: '4px solid #F0B90B',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'sans-serif' }}>
            Vérification de la session…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }

    // ── Not authenticated — render nothing (redirect is in progress) ───────
    if (!loggedIn) {
      return null;
    }

    // ── Authenticated — render protected page ─────────────────────────────
    return <Component {...props} />;
  };
}
