import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userId: string;
  googleProviderId: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('guestbook_user');
    const storedToken = localStorage.getItem('guestbook_token');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (storedToken && !parsedUser.googleProviderId) {
            parsedUser.googleProviderId = storedToken;
        }
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('guestbook_user');
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const oauthStatus = urlParams.get('oauth');
    const tokenParam = urlParams.get('token');
    const userDataParam = urlParams.get('user');

    if (oauthStatus === 'success' && tokenParam && userDataParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataParam));
        const finalUser = { ...userData, googleProviderId: tokenParam };
        
        setUser(finalUser);
        localStorage.setItem('guestbook_user', JSON.stringify(finalUser));
        localStorage.setItem('guestbook_token', tokenParam);
        
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error('Failed to parse OAuth user data', e);
      }
    }
    
    setLoading(false);
  }, []);

  const login = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('guestbook_user');
    localStorage.removeItem('guestbook_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
