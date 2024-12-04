import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User } from './Auth.types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if user already exists
      if (users.find(u => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password
      };

      // Add to users array and set as current user
      setUsers([...users, newUser]);
      setUser(newUser);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Find user
      const foundUser = users.find(u => u.email === email && u.password === password);


      console.log('Found user:', foundUser);
      if (foundUser === undefined) {
         toast.error('User not found');
      }else{
        toast.success('Successfully logged in!');
        setUser(foundUser);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
