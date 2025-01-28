import { Link } from "react-router-dom";

export default function SignUp() {
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
                    <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
                    <form action="#" method="POST">
                        {/* Username Input */}
                        <div className="mb-4">
                              <label htmlFor="name" className="block text-gray-600">
                                  Name
                              </label>
                              <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                  autoComplete="off"
                              />
                        </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
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
                                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                  autoComplete="off"
                              />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="password" className="block text-gray-600">
                                  Password Confirmation
                              </label>
                              <input
                                  type="password"
                                  id="password"
                                  name="password_confirmation"
                                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                  autoComplete="off"
                              />
                        </div>
                        <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        >
                              Login
                        </button>
                    </form>
                    {/* Sign up  Link */}
                    <div className="mt-6 text-blue-500 text-center">
                        Have an account ? 

                        <Link to='/admin/auth/login' className="hover:underline ml-2">
                              Login Here
                        </Link>
                    </div>
              </div>
          </div>  
    </>
  )
}
