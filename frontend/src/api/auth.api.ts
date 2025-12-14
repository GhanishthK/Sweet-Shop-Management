import api from './axios.config';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/index';

export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerApi = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};
