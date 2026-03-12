"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardWrapperProps {
  children: React.ReactNode;
  requiredRole: 'patient' | 'doctor';
}

export default function DashboardWrapper({ children, requiredRole }: DashboardWrapperProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== requiredRole) {
      router.push('/login');
      return;
    }
    
    setUser(parsedUser);
    setLoading(false);
  }, [router, requiredRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }



return (
  <div className="min-h-screen bg-gray-50">
    
    {/* Navbar */}
    <Navbar />

    <div className="flex bg-gray-200">
      
      {/* Sidebar */}
      <Sidebar role={requiredRole} />

      {/* Main Content */}
      <main className="flex-1 mt-4 p-6 w-full relative">
        {children}
      </main>

    </div>
  </div>
);}