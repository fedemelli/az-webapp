import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { apiUrl } from '../utils/api';

const STORAGE_KEY = 'az-webapp.authToken';

type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};

type LoginResult = { success: true } | { success: false; message: string };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStoredToken = (): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw || null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => readStoredToken());
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!token);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(apiUrl('/api/auth/me'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Token non valido');
        }
        const data = (await response.json()) as { user: User };
        setUser(data.user);
      } catch {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (username: string, password: string): Promise<LoginResult> => {
    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        return { success: false, message: data.message ?? 'Credenziali non valide.' };
      }

      const data = (await response.json()) as { token: string; user: User };
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(STORAGE_KEY, data.token);
      return { success: true };
    } catch {
      return { success: false, message: 'Errore di rete.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
