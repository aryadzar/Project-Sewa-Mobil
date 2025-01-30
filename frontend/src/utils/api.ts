import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      const token_admin = localStorage.getItem('ADMIN_TOKEN');
      const token_customer = localStorage.getItem('CUSTOMER_TOKEN');

      // Gunakan token admin untuk route admin
      if (config.url?.startsWith('/admin')) {
         if (token_admin) {
            config.headers.Authorization = `Bearer ${token_admin}`;
         }
      }

      // Gunakan token customer untuk route customer
      if (config.url?.startsWith('/customer')) {
         if (token_customer) {
            config.headers.Authorization = `Bearer ${token_customer}`;
         }
      }

      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
api.interceptors.response.use(
   function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
   },
   function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
   }
);

export default api;
