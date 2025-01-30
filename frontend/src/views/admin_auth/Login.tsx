import api from "../../utils/api";
import { useState } from "react";
import { useAdminAuth } from "../../context/AdminProvider";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// 📌 Validasi Schema dengan Yup
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Gunakan format email yang benar")
    .required("Email harus diisi"),
  password: yup
    .string()
    .required("Password harus diisi")
    .min(6, "Password minimal 6 karakter"),
});

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken, setUser } = useAdminAuth();

  // 📌 useForm untuk mengelola form dengan validasi Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  // 📌 Fungsi Submit
  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    api.post('/admin/login', data)
    .then(({ data }) => {
       setLoading(false);
       setToken(data.token);
       setUser(data.user);
       toast.success('Login Berhasil');
       console.log(data);
    })
    .catch((err) => {
       // console.log(err);
       setLoading(false);
       const { response } = err;

       if (response.status === 401) {
          setError(response.data.message);
          toast.error(response.data.message);
       }
    });
   //  try {
   //    const response = await api.post("/admin/login", data);
   //    setLoading(false);
   //    setToken(response.data.token);
   //    setUser(response.data.user);
   //    toast.success("Login Berhasil!");
   //  } catch (err) {
   //    setLoading(false);
   //    setLoading(false);
   //    const { response } = err;

   //    if (response.status === 401) {
   //       setError(response.data.message);
   //       toast.error(response.data.message);
   //    }
   //  }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      {/* Left: Image */}
      <div className="hidden h-screen w-1/2 lg:block">
        <img
          src="/auth_photo/login-img.jpg"
          alt="Login Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: Login Form */}
      <div className="sm:w-96 w-full p-8 md:p-12 lg:w-1/2 lg:p-16">
        <h1 className="mb-4 text-2xl font-semibold">Login Admin</h1>

        {error && (
          <div className="mb-4 flex rounded-lg bg-red-50 p-4 text-sm font-bold text-red-800">
            {error}
          </div>
        )}

        {/* 📌 Form dengan React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="off"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="off"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
