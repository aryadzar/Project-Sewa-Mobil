interface Props{
    typeBadge: string;
    text: string
}
export default function Badge({typeBadge, text} : Props) {
  return (
    <>
    {typeBadge === 'success' ?
        (<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">{text}</span>) 
        : 
        ( <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{text}</span>)
    }
    </>
  )
}
