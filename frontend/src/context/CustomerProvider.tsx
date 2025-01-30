import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '../types/AuthTypes';

const CustomerAuthContext = createContext<AuthContextType | null>(null);

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [user, setUser] = useState<User | null>(null);
   const [token, _setToken] = useState<string>('');

   const setToken = (token: string) => {
      _setToken(token);
      if (token) {
         localStorage.setItem('CUSTOMER_TOKEN', token);
      } else {
         localStorage.removeItem('CUSTOMER_TOKEN');
      }
   };

   return (
      <CustomerAuthContext.Provider
         value={{
            user,
            token,
            setUser,
            setToken,
         }}
      >
         {children}
      </CustomerAuthContext.Provider>
   );
};

export const useCustomerAuth = () => {
   const context = useContext(CustomerAuthContext);
   if (!context) {
      throw new Error(
         'useCustomerAuth must be used within CustomerAuthProvider'
      );
   }
   return context;
};
