import { JSX } from 'react';
import { Link } from 'react-router-dom';

interface Props {
   icon: JSX.Element;
   name: string;
   amount: number;
   link: string;
}

export default function Card({ icon, name, amount, link, ...props }: Props) {
   return (
      <div
         className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
         {...props}
      >
         {icon}
         <h5 className="text-2xl font-semibold tracking-tight text-gray-900">
            {name}
         </h5>
         <p className="mb-3 text-2xl font-medium text-gray-500">{amount}</p>
         <hr />
         <Link to={link}>
            <p className="mt-3 text-blue-500 hover:underline">
               View Detail &gt;
            </p>
         </Link>
      </div>
   );
}
