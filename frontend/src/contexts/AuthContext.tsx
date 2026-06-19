/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginService } from '../services/auth.service';
import { LoginResponse } from '../types';

interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  });
  const navigate = useNavigate();

  // const login = async (username: string, password: string) => {
  //   try {
  //     const response = await loginService(username, password);
  //     setUser(response);
  //     localStorage.setItem('token', response.token);
  //     localStorage.setItem('user', JSON.stringify(response));
  //     toast.success('Login successful!');
      
  //     // Redirect based on role
  //     const role = response.role;
  //     if (role === 'ROLE_VOTER' || role === 'VOTER') {
  //       navigate('/voter/dashboard');
  //     } else if (role === 'ROLE_PARTY' || role === 'PARTY') {
  //       navigate('/party/dashboard');
  //     } else if (role === 'ROLE_RO_RETURNING_OFFICER' || role === 'RO_RETURNING_OFFICER') {
  //       navigate('/admin/dashboard');
  //     } else {
  //       navigate('/');
  //     }
  //   } catch (error: unknown) {
  //     const message = error instanceof Error ? error.message : String(error);
  //     toast.error(message || 'Login failed');
  //     throw error;
  //   }
  // };
const login = async (username: string, password: string) => {
  try {
    const response = await loginService(username, password);
    setUser(response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response));
    toast.success('Login successful!');
    
    const rawRole = response.role || '';
    const role = rawRole.toUpperCase();
    console.log('🔍 Login role received:', rawRole, 'normalized to', role);
    
    if (role === 'ROLE_VOTER' || role === 'VOTER') {
      navigate('/voter/dashboard');
    } else if (role === 'ROLE_PARTY' || role === 'PARTY') {
      navigate('/party/dashboard');
    } else if (role === 'ROLE_CANDIDATE' || role === 'CANDIDATE') {
      navigate('/candidate/dashboard');
    } else if (role === 'ROLE_RO_RETURNING_OFFICER' || role === 'RO_RETURNING_OFFICER') {
      navigate('/admin/dashboard');
    } else {
      console.warn('Unknown role, redirecting to home:', rawRole);
      navigate('/');
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    toast.error(message || 'Login failed');
    throw error;
  }
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    const userRole = (user.role || '').toUpperCase();
    return roles.some(role => userRole.includes(role.toUpperCase()));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};