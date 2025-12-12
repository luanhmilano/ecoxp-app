import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiService, AuthResponse, LoginRequest, RegisterRequest } from '../services/api';

interface User {
  id: string;
  email: string;
  username?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && !!token;

  // Carregar dados armazenados ao iniciar
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      setIsLoading(true);
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      const storedUser = await SecureStore.getItemAsync(USER_KEY);

      if (storedToken && storedUser) {
        // Validar token com o backend
        const isValid = await apiService.validateToken(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          console.log('[AUTH] User session restored');
        } else {
          // Token inválido, limpar dados
          await clearStoredAuth();
          console.log('[AUTH] Invalid token, session cleared');
        }
      }
    } catch (error) {
      console.error('[AUTH] Error loading stored auth:', error);
      await clearStoredAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthData = async (authData: AuthResponse) => {
    try {
      // Converte o objeto para string JSON
      const authDataString = JSON.stringify(authData);
      await SecureStore.setItemAsync('auth_data', authDataString);
      
      // Salva token e user separadamente
      if (authData.accessToken) {
        await SecureStore.setItemAsync(TOKEN_KEY, authData.accessToken);
        setToken(authData.accessToken); // Atualiza o estado
      }
      if (authData.user) {
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(authData.user));
        setUser(authData.user); // Atualiza o estado
      }
      
      console.log('[AUTH] Auth data saved and state updated');
    } catch (error) {
      console.log('[AUTH] Error saving auth data:', error);
      throw new Error('Failed to save authentication data');
    }
  };

  const clearStoredAuth = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('[AUTH] Error clearing auth data:', error);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[AUTH] Attempting login with:', { usernameOrEmail: data.usernameOrEmail });
      
      const authResponse = await apiService.login(data);
      await saveAuthData(authResponse);
      
      console.log('[AUTH] Login successful, user:', authResponse.user);
      console.log('[AUTH] Auth state - isAuthenticated:', !!authResponse.user && !!authResponse.accessToken);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      console.error('[AUTH] Login error:', message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const authResponse = await apiService.register(data);
      await saveAuthData(authResponse);
      
      console.log('[AUTH] Registration successful');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      console.error('[AUTH] Registration error:', message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await clearStoredAuth();
      console.log('[AUTH] Logout successful');
    } catch (error) {
      console.error('[AUTH] Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}