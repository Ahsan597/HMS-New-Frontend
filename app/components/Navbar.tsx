// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
//         <h1 className="text-xl font-bold cursor-pointer">
//           MediTech+
//         </h1>

//       <div className="relative flex items-center space-x-6">
//         <div className="relative group">
//           <Link
//             href="/"
//             className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-medium"
//           >
//             Logout
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear your specific user object
    localStorage.removeItem("user"); // Removes {"id":"698426fe81edf613b09066fc","name":"Ahsan Shafiq","email":"ahsan@gmial.com","role":"patient"}
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    
    // Redirect to login
    router.push("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
            MediTech+
          </h1>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Healthcare</span>
        </div>

        <div className="relative flex items-center space-x-6">
          {/* Show user info if available */}
          {user && (
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-blue-100">{user.role}</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{user.name.charAt(0)}</span>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition-all hover:shadow-md flex items-center space-x-2"
          >
            <span>Logout</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              {user ? `Are you sure you want to logout, ${user.name}?` : 'Are you sure you want to logout?'}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}