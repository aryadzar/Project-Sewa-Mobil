import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from './layout/admin/AdminAuthLayout';
import Login from './views/admin_auth/Login';
import AdminDashboardLayout from './layout/admin/AdminDashboardLayout';
import AdminDashboard from './views/admin/AdminDashboard';
import AdminUsers from './views/admin/users/AdminUsers';
import NotFoundPage from './views/404/NotFound';
import AdminUserForm from './views/admin/user_form/AdminUserForm';

const router = createBrowserRouter([
   {
      path: '/admin',
      element: <AdminDashboardLayout />,
      children: [
         {
            path: '',
            element: <Navigate to="dashboard" />,
         },
         {
            path: 'dashboard',
            element: <AdminDashboard />,
            // name: ''
         },
         {
            path: 'users',
            element: <AdminUsers />,
         },
         {
            path: 'users/new',
            element: <AdminUserForm key="add_new" />,
         },
         {
            path: 'users/:id',
            element: <AdminUserForm key="edit_user" />,
         },
      ],
   },
   {
      path: '/admin/auth',
      element: <AuthLayout />,
      children: [
         {
            path: '',
            element: <Navigate to="login" />,
         },
         {
            path: 'login',
            element: <Login />,
         },
      ],
   },
   {
      path: '*',
      element: <NotFoundPage />,
   },
]);

export default router;
