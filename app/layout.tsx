import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LayoutContent from "./components/LayoutContent";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Hospital System",
  description: "Hospital Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <LayoutContent>
          {children}
          <Toaster position="top-right" />
        </LayoutContent>
      </body>
    </html>
  );
}