import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { AdminAuthProvider } from './context/AdminProvider.tsx'
import { CustomerAuthProvider } from './context/CustomerProvider.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminAuthProvider>
      <CustomerAuthProvider>
        <RouterProvider router={router} />
      </CustomerAuthProvider>
    </AdminAuthProvider>
    <Toaster/>
  </StrictMode>,
)
