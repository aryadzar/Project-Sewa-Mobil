import { JSX } from "react";
import { Link } from "react-router-dom";

interface Props{
    icon : JSX.Element,
    name : string,
    amount : number,
    link : string
}


export default function Card({
    icon, name, amount, link, ...props
} : Props) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm " {...props}>
        {icon}
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 ">{name}</h5>
        <p className="mb-3  text-2xl font-medium text-gray-500 ">{amount}</p>
        <hr />
        <Link to={link} >
            <p className="text-blue-500 hover:underline mt-3">View Detail &gt;</p>
        </Link>
    </div>
  )
}
