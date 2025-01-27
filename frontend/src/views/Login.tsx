import { Link } from "react-router-dom";
import api from "../utils/api";
import { useRef, useState } from "react";

export default function Login() {
  const emailRef = useRef<HTMLInputElement >(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      'email' : emailRef.current?.value,
      'password' : passwordRef.current?.value
    }

    // console.log(payload);

    api.post('/admin/login', payload)
    .then(({data})=> {
      setLoading(false);
      console.log(data);
    }).catch(err => {
      console.error(err);
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
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
                      Don't have an Account ? 
                        <Link to='/auth/signup' className="hover:underline ml-2">
                              Sign up Here
                        </Link>
                    </div>
              </div>
          </div>
      </>
  )
}
