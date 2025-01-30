export interface User {
   id: string;
   email: string;
   name: string;
   role: string;
}

export interface AuthContextType {
   user: User | null;
   token: string | null;
   setToken: (token: string) => void;
   setUser: (user: User | null) => void;
}
