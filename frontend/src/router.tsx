import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <Navigate to='/admin/auth/login'/>
    }
    ,
    {
        path: '/admin/auth',
        element: <AuthLayout/>,
        children: [
            
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <SignUp/>
            },

        ]
    }
])

export default router