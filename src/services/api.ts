const API_BASE_URL = process.env.EXPO_PUBLIC_URL_API || 'http://192.168.0.9:3000';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string,
    email: string;
    username: string;
    createdAt: string;
  }
}

export interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private baseURL = API_BASE_URL;

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();