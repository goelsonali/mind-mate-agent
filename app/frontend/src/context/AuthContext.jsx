import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendering');
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('token');
    console.log('Initial token from localStorage:', t);
    return t;
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      console.log('checkToken running...');
      // Check for token in URL on page load
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');
      console.log('Token from URL:', tokenFromUrl);
      
      if (tokenFromUrl) {
        console.log('Found token in URL, saving to localStorage');
        // Remove token from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        // Save token
        localStorage.setItem('token', tokenFromUrl);
        setToken(tokenFromUrl);
      }

      // Check for token in localStorage
      const currentToken = tokenFromUrl || token;
      console.log('Current token to check:', currentToken);
      
      if (currentToken) {
        try {
          console.log('Decoding token...');
          const decoded = jwtDecode(currentToken);
          console.log('Decoded token:', decoded);
          
          // Check if token is expired
          const isExpired = decoded.exp * 1000 < Date.now();
          console.log('Token expired?', isExpired);
          
          if (isExpired) {
            console.log('Token expired, logging out');
            logout();
          } else {
            console.log('Token valid, setting user');
            setUser(decoded);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          logout();
        }
      } else {
        console.log('No token found');
      }
      
      console.log('Setting loading to false');
      setLoading(false);
    };

    checkToken();
  }, []);

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const contextValue = {
    user,
    token,
    loading,
    logout,
    isAuthenticated: !!token
  };
  
  console.log('AuthContext value:', contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};