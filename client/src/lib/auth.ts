import { apiRequest } from "./queryClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  invitationCode?: string;
  verifyCode?: string;
  isStaff?: boolean;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  profileImage?: string;
  isStaff: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiRequest("POST", "/api/auth/login", credentials);
  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  
  return data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await apiRequest("POST", "/api/auth/register", userData);
  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    const response = await fetch("/api/auth/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      logout();
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to get current user:", error);
    logout();
    return null;
  }
};
