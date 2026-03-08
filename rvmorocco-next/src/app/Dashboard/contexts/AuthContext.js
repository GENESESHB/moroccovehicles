'use client';

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 1, name: 'Admin User', role: 'admin' });
  const [loading, setLoading] = useState(false);

  const login = async () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
