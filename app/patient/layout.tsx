"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    if (parsedUser.role !== 'patient') {
      router.push('/login');
      return;
    }
    
    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <DashboardNavbar userName={user.name} role={user.role} />
      <div className="flex pt-16"> {/* pt-16 to account for fixed navbar */}
        <Sidebar role="patient" />
        <main className="flex-1 ml-64 bg-gray-50 min-h-screen p-8">
          {children}
        </main>
      </div>
    </div>
  );
}