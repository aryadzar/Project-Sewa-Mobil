import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminProvider";

export default function AuthLayout() {
  const {token} = useAdminAuth()

  if(token){
    return <Navigate to='/admin/dashboard'/>
  }
  return (
    <div className="">
      <Outlet/>
    </div>
  )
}
