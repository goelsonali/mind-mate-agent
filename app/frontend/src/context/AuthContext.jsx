import { createContext, useContext, useState, useEffect } from 'react';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token in URL or localStorage on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check URL for token (from OAuth redirect)
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (token) {
          // Clear the token from URL to prevent security issues
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Store token in localStorage
          localStorage.setItem('auth_token', token);
          
          // Decode token to get user info (JWT is base64 encoded)
          try {
            const parts = token.split('.');
            if (parts.length !== 3) {
              throw new Error('Invalid token format');
            }
            
            // Base64 decode and parse the payload
            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            
            setUser({
              name: payload.name || 'User',
              email: payload.email || '',
              picture: payload.picture || '',
              sub: payload.sub || ''
            });
            setIsAuthenticated(true);
            console.log('Successfully authenticated from URL token');
          } catch (error) {
            console.error('Error parsing token from URL:', error);
            localStorage.removeItem('auth_token');
          }
        } else {
          // Check localStorage for existing token
          const storedToken = localStorage.getItem('auth_token');
          if (storedToken) {
            // Validate token and get user info
            try {
              const parts = storedToken.split('.');
              if (parts.length !== 3) {
                throw new Error('Invalid token format');
              }
              
              // Base64 decode and parse the payload
              const base64Url = parts[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const payload = JSON.parse(window.atob(base64));
              
              // Check if token is expired
              const currentTime = Date.now() / 1000;
              if (payload.exp && payload.exp < currentTime) {
                // Token expired, remove it
                localStorage.removeItem('auth_token');
                throw new Error('Token expired');
              }
              
              setUser({
                name: payload.name || 'User',
                email: payload.email || '',
                picture: payload.picture || '',
                sub: payload.sub || ''
              });
              setIsAuthenticated(true);
              console.log('Successfully authenticated from stored token');
            } catch (error) {
              console.error('Invalid stored token:', error);
              localStorage.removeItem('auth_token');
            }
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      handleGoogleLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
