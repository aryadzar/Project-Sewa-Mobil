import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminProvider';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { menuAdmin } from '../../menu/admin_menu';
import { motion } from 'framer-motion';
export default function AdminDashboardLayout() {
   const { token, user, setUser, setToken } = useAdminAuth();
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const [loading, setLoading] = useState(true);
   const location = useLocation();
   useEffect(() => {
      if (user !== null) {
         setLoading(false);
      }
   }, [user]);
   // Redirect jika tidak ada token
   if (!token) {
      return <Navigate to="/admin/auth" />;
   }

   const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const toastId = toast.loading('Logging out...');

      api.post('/admin/logout', {})
         .then(({ data }) => {
            setUser(null);
            setToken('');
            toast.success(data.message, { id: toastId });
         })
         .catch(() => {
            toast.error('Logout failed. Please try again.', { id: toastId });
         });
   };

   return (
      <div className="flex h-screen">
         {/* Sidebar */}
         <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 text-white ${
               isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 md:static md:w-64 md:translate-x-0`}
         >
            <div className="border-b border-gray-700 p-4 text-center text-2xl font-bold">
               Admin Panel
            </div>
            <nav className="flex-grow">
               <ul className="space-y-2 p-4">
                  {menuAdmin.map((item) => (
                     <li key={item.path}>
                        <NavLink
                           to={item.path}
                           className={({ isActive }) =>
                              `flex items-center gap-3 rounded px-4 py-2 hover:bg-gray-700 ${
                                 isActive ? 'bg-gray-700' : ''
                              }`
                           }
                        >
                           {item.icon}
                           {item.name}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            </nav>
            <div className="border-t border-gray-700 p-4 text-center text-sm">
               &copy; 2025 Admin Panel
            </div>
         </aside>

         {/* Mobile Menu Toggle */}
         <button
            className="absolute left-4 top-4 z-50 mb-52 rounded bg-gray-800 p-2 text-white md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
         >
            {isSidebarOpen ? 'Close' : 'Menu'}
         </button>

         {/* Main Content */}
         <main className="ml-0 flex-grow overflow-auto bg-gray-100 p-6">
            <header className="sticky mb-6 flex items-center justify-between rounded-sm">
               <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
               <div className="flex items-center text-gray-700">
                  Welcome,
                  {loading ? (
                     // Skeleton loader inline dengan teks
                     <div className="ml-3 h-5 w-20 animate-pulse rounded bg-gray-200"></div>
                  ) : (
                     <span className="ml-3 font-bold">{user?.name}</span>
                  )}
                  <button
                     className="mb-2 me-2 ml-3 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                     onClick={onLogout}
                  >
                     Logout
                  </button>
               </div>
            </header>
            <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: -20 }} // Posisi awal animasi
               animate={{ opacity: 1, y: 0 }} // Posisi akhir animasi
               exit={{ opacity: 0, y: -20 }} // Posisi keluar animasi (jika ada)
               transition={{ duration: 0.5, ease: 'easeInOut' }} // Durasi dan gaya animasi
            >
               <Outlet />
            </motion.div>
            <div></div>
         </main>
      </div>
   );
}
