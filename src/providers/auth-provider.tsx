import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { usernameOrEmail: string; password: string }) => Promise<User>;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS = [
  { id: '1', username: 'demo', email: 'demo@ecoxp.com', password: '123456' },
  { id: '2', username: 'usuario', email: 'usuario@ecoxp.com', password: 'senha123' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Inicia como true
  const [error, setError] = useState<string | null>(null);

  // Simula verificação de sessão existente no início do app
  useEffect(() => {
    const checkAuthState = async () => {
      // Simula verificação de AsyncStorage ou token persistido
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };
    
    checkAuthState();
  }, []);

  const login = async (credentials: { usernameOrEmail: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = MOCK_USERS.find(u => 
      (u.username === credentials.usernameOrEmail || u.email === credentials.usernameOrEmail) &&
      u.password === credentials.password
    );

    if (foundUser) {
      const authenticatedUser = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      };
      setUser(authenticatedUser);
      setIsLoading(false);
      // Retorna sucesso explicitamente
      return authenticatedUser;
    } else {
      setIsLoading(false);
      throw new Error('Usuário ou senha inválidos');
    }
  };

  const register = async (userData: { username: string; email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUser = MOCK_USERS.find(u => 
      u.username === userData.username || u.email === userData.email
    );

    if (existingUser) {
      setIsLoading(false);
      if (existingUser.username === userData.username) {
        throw new Error('Nome de usuário já está em uso');
      } else {
        throw new Error('E-mail já está cadastrado');
      }
    }

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      username: userData.username,
      email: userData.email,
      password: userData.password
    };
    
    MOCK_USERS.push(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      clearError
    }}>
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