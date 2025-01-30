import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

function NotFoundView() {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">User Tidak Ditemukan</p>
        <Link to="/admin/users" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Kembali ke Daftar Users
        </Link>
      </div>
    );
  }
  


const UserFormValidationSchema = yup.object().shape({
   name: yup.string().required('Nama Wajib Diisi'),
   email: yup
      .string()
      .email('Masukan Email Dengan Benar')
      .required('Email Wajib Diisi'),
   address: yup.string().required('Alamat Wajib Diisi'),
});

export default function AdminUserForm() {
   const navigate = useNavigate();
   const [loading, setLoading] = useState<boolean>(false);
   const { id } = useParams(); // Ambil ID user dari URL
   const [loadingData, setLoadingData] = useState<boolean>(!!id); // Hanya loading saat edit
   const [notFound, setNotFound] = useState<boolean>(false); // 📌 State untuk cek 404

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(UserFormValidationSchema),
      defaultValues: { name: '', email: '', address: '' }, // Default kosong
   });

   useEffect(() => {
      if (id) {
         setLoadingData(true);
         api.get(`/admin/user/${id}`)
            .then(({ data }) => {
               reset(data.data);
               setLoadingData(false);
            })
            .catch(() => {
               toast.error('Gagal mengambil data user');
               setNotFound(true)
               setLoadingData(false);
            });
      }
   }, [id, reset, navigate  ]);

   const onSubmit = (data: {
      name: string;
      email: string;
      address: string;
   }) => {
      setLoading(true);
      if (!id) {
         api.post('/admin/users', data)
            .then(() => {
               setLoading(false);
               toast.success('Users Berhasil Ditambahkan');
               navigate('/admin/users');
            })
            .catch((err) => {
               setLoading(false);
               const { response } = err;
               if (response.status === 422) {
                  toast.error(`${response.data.message}`);
               }
            });
      }
   };
   if (notFound) {
    return <NotFoundView />;
  }
   return (
      <div>
         <h1 className="mb-4 text-xl font-bold">
            {id ? 'Edit User' : 'Tambah User'}
         </h1>
         {loadingData ? (
            // 🟢 SKELETON LOADING
            <div>
               <div className="mb-5">
                  <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-300"></div>
                  <div className="h-10 animate-pulse rounded bg-gray-300"></div>
               </div>
               <div className="mb-5">
                  <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-300"></div>
                  <div className="h-10 animate-pulse rounded bg-gray-300"></div>
               </div>
               <div className="mb-5">
                  <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-300"></div>
                  <div className="h-20 animate-pulse rounded bg-gray-300"></div>
               </div>
               <div className="h-10 w-full animate-pulse rounded bg-gray-400"></div>
            </div>
         ) : (
            // 🟢 FORM INPUT ASLI
            <form onSubmit={handleSubmit(onSubmit)}>
               {/* Name Input */}
               <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                     Nama
                  </label>
                  <input
                     type="text"
                     autoComplete="off"
                     {...register('name')}
                     className={`border bg-gray-50 ${errors.name ? 'border-red-500' : 'border-gray-300'} block w-full rounded-lg p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                     placeholder="Masukan Nama"
                  />
                  {errors.name && (
                     <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                     </p>
                  )}
               </div>

               {/* Email Input */}
               <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                     Email
                  </label>
                  <input
                     type="email"
                     autoComplete="off"
                     {...register('email')}
                     className={`border bg-gray-50 ${errors.email ? 'border-red-500' : 'border-gray-300'} block w-full rounded-lg p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                     placeholder="name@flowbite.com"
                  />
                  {errors.email && (
                     <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                     </p>
                  )}
               </div>

               {/* Address Input */}
               <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                     Alamat
                  </label>
                  <textarea
                     rows={4}
                     autoComplete="off"
                     {...register('address')}
                     className={`border bg-gray-50 ${errors.address ? 'border-red-500' : 'border-gray-300'} block w-full rounded-lg p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                     placeholder="Masukan Alamat"
                  />
                  {errors.address && (
                     <p className="mt-1 text-sm text-red-600">
                        {errors.address.message}
                     </p>
                  )}
               </div>

               {/* Submit Button */}
               <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
               >
                  {loading ? 'Loading...' : 'Submit'}
               </button>
            </form>
         )}
      </div>
   );
}
