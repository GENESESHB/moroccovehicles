'use client';

import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
const axiosInstance = axios.default || axios;
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) {
      setMessage(decodeURIComponent(msg));
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      router.push('/Dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('https://moroccovehicles-1-6zww.onrender.com/api/auth/login', {
        email,
        password,
      });
      setLoading(false);
      setMessage('Connexion réussie');
      const { token, user: userData } = response.data;
      if (login) {
        await login(token, userData || null);
      }
      router.push('/Dashboard');
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || 'Échec de la connexion');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '40px 32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '380px',
        border: '1px solid #e5e7eb'
      }}>
        {/* Header avec logo et texte */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              background: '#36c275',
              boxShadow: '0 6px 18px rgba(54, 194, 117, .35)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: '800'
            }}>
              M.
            </div>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#36c275',
                margin: 0,
                lineHeight: '1.2'
              }}>
                MoroccoVehicles
              </h1>
              <p style={{
                color: '#6b7280',
                fontWeight: '600',
                margin: 0,
                fontSize: '12px'
              }}>
                Espace Partenaires
              </p>
            </div>
          </div>

          <p style={{
            color: '#374151',
            fontWeight: '500',
            margin: '12px 0 0 0',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Connectez-vous à votre compte partenaire pour gérer votre flotte automobile
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: message.includes('réussie') ? '#e8f7eb' : '#fde8e8',
            color: message.includes('réussie') ? '#1e8a3a' : '#dc2626',
            fontWeight: '600',
            fontSize: '13px',
            marginBottom: '16px',
            border: `1px solid ${message.includes('réussie') ? '#c9f0cf' : '#fecaca'}`
          }}>
            {message}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #36c275',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Email Partenaire
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="partenaire@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 14px 12px 42px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: "inherit"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, .28), 0 0 0 1px #36c275';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: '0.75',
                color: '#36c275'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Votre mot de passe partenaire"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 14px 12px 42px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: "inherit"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, .28), 0 0 0 1px #36c275';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: '0.75',
                color: '#36c275'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              marginTop: '6px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              background: '#36c275',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(54, 194, 117, .28), inset 0 -2px 0 rgba(0,0,0,.08)',
              transition: 'all 0.2s ease',
              fontFamily: "inherit"
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.background = '#2da864';
                e.target.style.filter = 'saturate(1.05)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.background = '#36c275';
                e.target.style.filter = 'none';
              }
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(1px)';
                e.target.style.boxShadow = '0 4px 14px rgba(54, 194, 117, .33), inset 0 1px 0 rgba(255,255,255,.2)';
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(54, 194, 117, .28), inset 0 -2px 0 rgba(0,0,0,.08)';
              }
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Support Link */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#6b7280',
            fontWeight: '600',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            Problème de connexion ?
          </p>
          <button
            onClick={() => window.location.href = 'mailto:support@moroccovehicles.com'}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '10px 14px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              background: 'transparent',
              color: '#6b7280',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "inherit"
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#36c275';
              e.target.style.color = '#36c275';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.color = '#6b7280';
            }}
          >
            Contacter le support
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default function Login() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
        <div style={{ width: '28px', height: '28px', border: '3px solid #e5e7eb', borderTopColor: '#36c275', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}