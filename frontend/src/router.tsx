import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./layout/admin/AdminAuthLayout";
import Login from "./views/admin_auth/Login";
import AdminDashboardLayout from "./layout/admin/AdminDashboardLayout";
import AdminDashboard from "./views/admin/AdminDashboard";


const router = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminDashboardLayout/>,
        children : [
            {
                path: 'dashboard',
                element: <AdminDashboard/>,
                // name: ''
            }
        ]
    }
    ,
    {
        path: '/admin/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '',
                element: <Navigate to='login' />
            }
            ,
            {
                path: 'login',
                element: <Login/>
            }
        ]
    }
])

export default router
