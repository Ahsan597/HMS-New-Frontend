import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

 // api.service.ts - Make sure request interceptor is working
this.api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Request to:', config.url, 'Token exists:', !!token); // Debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // You can redirect to login page here if needed
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // POST request
  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PATCH request
  async patch<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Create and export a single instance
export const apiService = new ApiService();