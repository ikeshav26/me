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
    // Initial load from localStorage
    const storedUser = localStorage.getItem('guestbook_user');
    const storedToken = localStorage.getItem('guestbook_token');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Sync token if missing in user object
        if (storedToken && !parsedUser.googleProviderId) {
            parsedUser.googleProviderId = storedToken;
        }
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('guestbook_user');
      }
    }

    // Check for OAuth parameters in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const oauthStatus = urlParams.get('oauth');
    const tokenParam = urlParams.get('token');
    const userDataParam = urlParams.get('user');

    if (oauthStatus === 'success' && tokenParam && userDataParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataParam));
        // Ensure googleProviderId is set from token
        const finalUser = { ...userData, googleProviderId: tokenParam };
        
        setUser(finalUser);
        localStorage.setItem('guestbook_user', JSON.stringify(finalUser));
        localStorage.setItem('guestbook_token', tokenParam);
        
        // Clean up URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error('Failed to parse OAuth user data', e);
      }
    }
    
    setLoading(false);
  }, []);

  const login = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:3000/api/auth/google';
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
