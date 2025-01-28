import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useRef, useState } from "react";
import { useAdminAuth } from "../../context/AdminProvider";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const loginValidationSchema = yup.object().shape({
    email : yup.string().email("Gunakan Format Email Yang Benar").required("Email Harus Diisi"),
    password : yup.string().required("Password harus diisi")
})

export default function Login() {
    const emailRef = useRef<HTMLInputElement >(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {setToken, setUser} = useAdminAuth()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginValidationSchema)
    })

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);
        const payload = {
            'email' : emailRef.current?.value,
            'password' : passwordRef.current?.value
        }


        api.post('/admin/login', payload)
        .then(({data})=> {
            setLoading(false);
            setToken(data.token)
            setUser(data.user)
            toast.success('Login Berhasil')
            console.log(data);
        }).catch(err => {
            // console.log(err);
            setLoading(false);
            const {response} = err

            if(response.status === 401){
                setError(response.data.message)
                toast.error(response.data.message);
            }
            
        })
    }


  return (
      <>
          <div className="bg-white flex justify-center items-center h-screen">
              {/* Left: Image */}
              <div className="w-1/2 h-screen hidden lg:block">
                    <img
                        src="/auth_photo/login-img.jpg"
                        alt="Placeholder Image"
                        className="object-cover w-full h-full"
                    />
              </div>
              {/* Right: Login Form */}
              <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login Admin</h1>
                    {error && <div className="flex p-4 mb-4 text-sm font-bold mt-5 text-red-800 rounded-lg bg-red-50">
                        {error}    
                    </div>}
                    <form onSubmit={onSubmit}>
                        {/* Username Input */}
                        <div className="mb-4">
                              <label htmlFor="username" className="block text-gray-600">
                                  Email
                              </label>
                              <input
                                  type="email"
                                  id="username"
                                  name="email"
                                  ref={emailRef}
                                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                  autoComplete="off"
                              />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                              <label htmlFor="password" className="block text-gray-600">
                                  Password
                              </label>
                              <input
                                  type="password"
                                  id="password"
                                  name="password"
                                  ref={passwordRef}
                                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                  autoComplete="off"
                              />
                        </div>
                        {/* Remember Me Checkbox */}
                        {/* <div className="mb-4 flex items-center">
                              <input
                                  type="checkbox"
                                  id="remember"
                                  name="remember"
                                  className="text-blue-500"
                              />
                              <label htmlFor="remember" className="text-gray-600 ml-2">
                                  Remember Me
                              </label>
                        </div> */}
                        {/* Forgot Password Link */}
                        {/* <div className="mb-6 text-blue-500">
                              <a href="#" className="hover:underline">
                                  Forgot Password?
                              </a>
                        </div> */}
                        {/* Login Button */}
                        <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                              disabled={loading}
                        >
                              {loading ? 'Loading...' : "Login"} 
                        </button>
                    </form>
                    {/* Sign up  Link */}
                    <div className="mt-6 text-blue-500 text-center">
                      {/* Don't have an Account ? 
                        <Link to='/admin/auth/signup' className="hover:underline ml-2">
                              Sign up Here
                        </Link> */}
                    </div>
              </div>
          </div>
      </>
  )
}
