import api from './api';
import { LoginResponse } from '../types';

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const verifyEmail = async (token: string): Promise<void> => {
  await api.get(`/auth/verify?token=${token}`);
};

export const testEmailConfig = async () => {
  const response = await api.get('/auth/test-email-config');
  return response.data;
};