import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, SignupCredentials } from '../types/auth';
import { AuthService } from '../services/authService';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    try {
      const user = AuthService.validateCredentials(credentials);
      
      if (user) {
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        navigate('/');
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      return false;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      AuthService.createUser(credentials);
      navigate('/login');
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return {
    error,
    login,
    signup,
    logout
  };
};