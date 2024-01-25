import type { AuthResponse } from '@/types';
import { NetClient } from '../http/net-client';
import type { AxiosResponse } from 'axios';

export class AuthApi {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return NetClient.post<AuthResponse>('/api/auth/login', { email, password });
  }

  static async register(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return NetClient.post<AuthResponse>('/api/auth/register', { email, password });
  }
}
