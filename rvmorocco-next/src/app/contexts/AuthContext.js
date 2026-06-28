'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Fetch real profile from backend using stored token ─────────────────
  const fetchProfile = useCallback(async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Use the real backend endpoint: GET /api/auth/me
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 8000,
      });

      // Backend returns { success: true, user: { name, entreprise, logoEntreprise, ... } }
      const userData = response.data?.user || response.data;
      if (userData) {
        setUser(userData);
        // Cache the user data in localStorage to survive refreshes instantly
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('No user data in response');
      }
    } catch (err) {
      console.warn('[Auth] Failed to fetch profile:', err?.response?.status, err?.message);

      // Before clearing, check if there is cached user data we can use
      const cached = localStorage.getItem('user');
      if (cached) {
        try {
          const parsedUser = JSON.parse(cached);
          setUser(parsedUser);
          console.log('[Auth] Using cached user data:', parsedUser?.name);
          // Don't clear token — the backend might just be temporarily unreachable
        } catch {
          // Corrupt cache: only clear on 401 (definitely invalid token)
          if (err?.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        }
      } else {
        // No cache — on 401 clear everything
        if (err?.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ── On mount: check for cached user first (instant load), then verify ──
  useEffect(() => {
    const cached = localStorage.getItem('user');
    if (cached) {
      try {
        const parsedUser = JSON.parse(cached);
        setUser(parsedUser);
        setLoading(false); // Show dashboard immediately with cached data
        // Then quietly verify/refresh in the background
        fetchProfile();
        return;
      } catch {
        localStorage.removeItem('user');
      }
    }
    // No cache: full fetch
    fetchProfile();
  }, [fetchProfile]);

  // ── Login: store token + user data immediately ─────────────────────────
  const login = useCallback(async (token, userData = null) => {
    localStorage.setItem('token', token);

    if (userData) {
      // Backend sent user object with the login response — use it right away
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      // Fallback: fetch from /api/auth/me
      await fetchProfile();
    }
  }, [fetchProfile]);

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loggedIn: !!user,
        refreshAuth: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
