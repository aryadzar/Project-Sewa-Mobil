import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "../types/AuthTypes";

const AdminAuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token  : string) => {
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

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