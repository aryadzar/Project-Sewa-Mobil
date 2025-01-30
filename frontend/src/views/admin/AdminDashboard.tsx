import Card from '../../components/Card';
import { Users } from 'lucide-react';

export default function AdminDashboard() {
   const url_prefix = '/admin';
   return (
      <>
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div>
               <Card
                  icon={<Users size={36} strokeWidth={1.5} />}
                  name="Users"
                  amount={60}
                  link={`${url_prefix}/users`}
               />
            </div>
            <div>
               <Card
                  icon={<Users size={36} strokeWidth={1.5} />}
                  name="Users"
                  amount={60}
                  link={`${url_prefix}/users`}
               />
            </div>
            <div>
               <Card
                  icon={<Users size={36} strokeWidth={1.5} />}
                  name="Users"
                  amount={60}
                  link={`${url_prefix}/users`}
               />
            </div>
         </div>
      </>
   );
}
