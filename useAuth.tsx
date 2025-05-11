
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Define the user type
export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' as const }
];

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      setIsLoading(false);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "This email is already registered",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    
    // In a real app, we would make an API call to register the user
    // For this demo, we'll simulate adding to our mock users (though this won't persist)
    // and then log them in automatically
    mockUsers.push({ 
      name, 
      email, 
      password, 
      role: 'user' as const 
    });
    
    const userData = {
      name,
      email,
      role: 'user' as const
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully",
    });
    
    setIsLoading(false);
    
    // Navigate to dashboard after successful registration
    navigate('/dashboard');
    
    return true;
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
