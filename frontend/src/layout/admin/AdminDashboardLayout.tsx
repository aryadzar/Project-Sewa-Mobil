import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminProvider'
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { menuAdmin } from '../../menu/admin_menu';

export default function AdminDashboardLayout() {

  const { token, user, setUser, setToken } = useAdminAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Redirect jika tidak ada token
  if (!token) {
    return <Navigate to="/admin/auth" />;
  }

  const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    const toastId = toast.loading("Logging out...");


    api.post('/admin/logout', {})
    .then(({data})=> {
      setUser(null);
      setToken('');
      toast.success(data.message, { id: toastId });
    }).catch(()=> {
      toast.error("Logout failed. Please try again.", { id: toastId });
    })

  }
 
    return (
<div className="flex h-screen">
     {/* Sidebar */}
     <aside
          className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 z-40 transform ${
               isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0 md:static md:w-64`}
     >
          <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
               Admin Panel
          </div>
          <nav className="flex-grow">
               <ul className="space-y-2 p-4">
                    {menuAdmin.map((item) => (
                         <li key={item.path}>
                              <NavLink
                                   to={item.path}
                                   className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                                             isActive ? "bg-gray-700" : ""
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
          <div className="p-4 border-t border-gray-700 text-sm text-center">
               &copy; 2025 Admin Panel
          </div>
     </aside>

     {/* Mobile Menu Toggle */}
     <button
          className="absolute top-4 left-4 z-50 md:hidden p-2 mb-52 bg-gray-800 text-white rounded"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
     >
          {isSidebarOpen ? "Close" : "Menu"}
     </button>

     {/* Main Content */}
     <main className="flex-grow bg-gray-100 p-6 overflow-auto ml-0 ">
          <header className="flex justify-between items-center mb-6">
               <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
               <div className="text-gray-700">
                    Welcome, <span className="font-bold">{user?.name}</span>
                    <button className=' ml-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                    onClick={onLogout}
                    >Logout</button>
               </div>
          </header>
          <div>
               <Outlet />
          </div>
     </main>
</div>
    )
}
