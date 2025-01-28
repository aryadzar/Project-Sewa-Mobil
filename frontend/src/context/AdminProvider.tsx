import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types/AuthTypes";
import api from "../utils/api";
import toast from "react-hot-toast";

const AdminAuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ADMIN_TOKEN'));

    const setToken = (token  : string) => {
        _setToken(token);
        if(token){
            localStorage.setItem('ADMIN_TOKEN', token);
        }else{
            localStorage.removeItem('ADMIN_TOKEN');
        }
    }

    // Validate token with backend
    const validateToken = async () => {
        if (!token) return;

        try {
        const { data } = await api.post("/auth/cek_token", {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        // If token is valid, set the user data
        setUser(data.user);
        } catch (error) {
        // If token is invalid, clear token and user
        console.error(error);
        toast.error("Session Expired")
        setToken('');   
        setUser(null);
        }
    };

    // Validate token on mount
    useEffect(() => {
        validateToken();
    }, [token]);

    return (
    <AdminAuthContext.Provider value={{ 
        user,
        token,
        setUser ,
        setToken
     }}
    >
        {children}
    </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
      throw new Error("useAdminAuth must be used within AdminAuthProvider");
    }
    return context;
  };