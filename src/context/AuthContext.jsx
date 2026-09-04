/**
 * WEB AURA 2K26 - Authentication Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribeAuthState((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const user = await authService.loginWithEmail(email, password);
    setCurrentUser(user);
    return user;
  };

  const signup = async (name, email, password) => {
    const user = await authService.signupWithEmail(name, email, password);
    setCurrentUser(user);
    return user;
  };

  const loginWithGoogle = async () => {
    const user = await authService.loginWithGoogle();
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const refreshUser = () => {
    if (currentUser?.uid) {
      const fresh = userService.getUser(currentUser.uid);
      if (fresh) setCurrentUser(fresh);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role: currentUser?.role || 'GUEST',
      isAuthenticated: Boolean(currentUser),
      loading,
      login,
      signup,
      loginWithGoogle,
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
