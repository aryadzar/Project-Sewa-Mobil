import { Link } from 'react-router-dom';

export default function SignUp() {
   return (
      <>
         <div className="flex h-screen items-center justify-center bg-white">
            {/* Left: Image */}
            <div className="hidden h-screen w-1/2 lg:block">
               <img
                  src="/auth_photo/login-img.jpg"
                  alt="Placeholder Image"
                  className="h-full w-full object-cover"
               />
            </div>
            {/* Right: Login Form */}
            <div className="sm:20 w-full p-8 md:p-52 lg:w-1/2 lg:p-36">
               <h1 className="mb-4 text-2xl font-semibold">Sign Up</h1>
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                     />
                  </div>
                  <button
                     type="submit"
                     className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                  >
                     Login
                  </button>
               </form>
               {/* Sign up  Link */}
               <div className="mt-6 text-center text-blue-500">
                  Have an account ?
                  <Link to="/admin/auth/login" className="ml-2 hover:underline">
                     Login Here
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}
