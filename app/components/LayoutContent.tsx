"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current page is login
  const isLoginPage = pathname === '/Login';
  const isDashboard = pathname?.startsWith('/patient') || pathname?.startsWith('/doctor');

  
  return (
    <>
      <main>{children}</main>
      {!isLoginPage && <Footer />}
    </>
  );
}
