import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [matchmaker, setMatchmaker] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('tdc_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.auth.getMe();
        if (res.success) {
          setMatchmaker(res.data);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification failed:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.auth.login({ email, password });
    if (res.success && res.data.token) {
      localStorage.setItem('tdc_token', res.data.token);
      setToken(res.data.token);
      setMatchmaker(res.data.matchmaker);
      return res.data;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('tdc_token');
    setToken(null);
    setMatchmaker(null);
  };

  return (
    <AuthContext.Provider
      value={{
        matchmaker,
        token,
        isAuthenticated: !!matchmaker,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
