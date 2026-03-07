import { apiService } from './api.service';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/auth/login', credentials);
      
      // Store user data in localStorage
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        // If your backend returns a token, store it too
        // localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

// Create and export a single instance
export const authService = new AuthService();