import { Home, Users, Settings } from "lucide-react";
import { JSX } from "react";

export interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

export const menuAdmin: MenuItem[] = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <Home size={20} />,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <Users size={20} />,
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <Settings size={20} />,
  },
];
