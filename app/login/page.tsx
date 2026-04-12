"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/app/service/api.service'; // Use your apiService

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Use apiService
      const response = await apiService.post('/auth/login', {
        email,
        password
      });

      console.log('Login response:', response); // Debug: see full response
      
      // ✅ STORE BOTH TOKEN AND USER
      const { token, user } = response; // Now this will work!
      
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('Token stored:', token ? 'Yes' : 'No');
      console.log('User stored:', user ? 'Yes' : 'No');
      
      // Redirect based on role
      if (user.role === 'doctor') {
        router.push('/doctor/dashboard');
      } else if (user.role === 'patient') {
        router.push('/patient/dashboard');
      } else {
        router.push('/dashboard');
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Hospital Management System</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}