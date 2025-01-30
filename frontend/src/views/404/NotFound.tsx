import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
   const navigate = useNavigate();

   const handleGoHome = () => {
      navigate('/'); // Navigasi ke halaman utama
   };

   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
         <h1 className="text-6xl font-bold text-gray-800">404</h1>
         <p className="mt-4 text-xl text-gray-600">Halaman tidak ditemukan</p>
         <button
            onClick={handleGoHome}
            className="mt-8 rounded-lg bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
         >
            Kembali ke Beranda
         </button>
      </div>
   );
};

export default NotFoundPage;
