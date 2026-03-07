"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardNavbarProps {
  userName: string;
  role: string;
}

export default function DashboardNavbar({ userName, role }: DashboardNavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">
          MediTech+
        </h1>
      </Link>

      <div className="flex items-center space-x-4">
        <span className="text-sm">
          Welcome, {userName} ({role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}