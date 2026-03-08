'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { loggedIn } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const savedToken = localStorage.getItem('token');
      
      if (!loggedIn && !savedToken) {
        // Rediriger vers la page d'accueil ou de connexion
        router.push('/login');
      }
    }, [loggedIn, router]);

    useEffect(() => {
      if (loggedIn) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }, [loggedIn]);

    if (!isAuthorized) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0B0E11', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #F0B90B',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}} />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
