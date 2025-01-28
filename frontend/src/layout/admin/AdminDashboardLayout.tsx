import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminProvider'
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function AdminDashboardLayout() {

  const { token, user, setUser, setToken } = useAdminAuth();

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
      <div>
        <div>
          Yang Login Sekarang : {user?.name}
        </div>
        <div>
            <button onClick={onLogout} className='hover:underline'>logout</button>
        </div>
          <Outlet/>
      </div>
    )
}
