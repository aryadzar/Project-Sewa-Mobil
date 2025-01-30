interface Props {
   typeBadge: string;
   text: string;
}
export default function Badge({ typeBadge, text }: Props) {
   return (
      <>
         {typeBadge === 'success' ? (
            <span className="me-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
               {text}
            </span>
         ) : (
            <span className="me-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
               {text}
            </span>
         )}
      </>
   );
}
