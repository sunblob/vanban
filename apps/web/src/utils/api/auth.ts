import type { AxiosResponse } from 'axios';
import type { AuthResponse, MessageResponse } from '@/types';
import { NetClient } from '../http/net-client';

export class AuthApi {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return NetClient.post<AuthResponse>('/api/auth/login', { email, password });
  }

  static async register(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return NetClient.post<AuthResponse>('/api/auth/register', { email, password });
  }

  static async checkToken(token: string): Promise<AxiosResponse<MessageResponse>> {
    return NetClient.post<MessageResponse>('/api/auth/check-token', { token });
  }
}
