
import { toast } from "sonner";

// Mock authentication functions - in a real app, these would call a backend API
const LOCAL_STORAGE_KEY = 'auth-demo-user';

export type User = {
  id: string;
  email: string;
  name: string;
};

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY);
  return !!user;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - in a real app this would be handled by your backend
  if (password.length < 6) {
    throw new Error('Invalid credentials');
  }
  
  // Create mock user
  const user: User = {
    id: 'user-1',
    email,
    name: email.split('@')[0],
  };
  
  // Save to local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  
  toast.success('Successfully logged in');
  return user;
};

export const register = async (email: string, password: string, name: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create mock user
  const user: User = {
    id: 'user-' + Date.now(),
    email,
    name,
  };
  
  // Save to local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  
  toast.success('Account created successfully');
  return user;
};

export const logout = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove from local storage
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  
  toast.success('Successfully logged out');
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (currentPassword === newPassword) {
    throw new Error('New password must be different from current password');
  }
  
  toast.success('Password changed successfully');
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  toast.success('Password reset instructions sent');
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  toast.success('Password reset successfully');
};
