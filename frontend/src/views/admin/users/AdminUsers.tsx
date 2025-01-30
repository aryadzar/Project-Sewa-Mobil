import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { User } from '../../../types/UserTypes';
import Badge from '../../../components/Badge';
import readableDate from '../../../helper/dateHumans';
import { debounce } from 'lodash'; // Gunakan lodash untuk debounce
import { Pencil, Trash2 } from 'lucide-react';

const CustomLoader = () => (
   <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </div>
);

export default function AdminUsers() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(10);
   const [totalRows, setTotalRows] = useState<number>(0);
   const [search, setSearch] = useState<string>(''); // State untuk pencarian

   useEffect(() => {
      fetchUsers(currentPage, pageSize, search);
   }, [currentPage, pageSize, search]);

   const fetchUsers = (page: number, size = pageSize, searchQuery = search) => {
      setLoading(true);
      api.get('/admin/users', {
         params: {
            page,
            pageSize: size,
            q: searchQuery, // Kirim parameter pencarian ke server
         },
      })
         .then(({ data }) => {
            setUsers(data.data);
            setTotalRows(data.total);
            setLoading(false);
         })
         .catch((err) => {
            toast.error(`Error Message : ${err}`);
            setLoading(false);
         });
   };

   // Debounced search input handler
   const handleSearch = debounce((value: string) => {
      setSearch(value);
      setCurrentPage(1); // Reset ke halaman pertama setiap kali pencarian berubah
   }, 500); // Tunggu 500ms setelah pengguna berhenti mengetik

   const handlePageSizeChange = (newPageSize: number) => {
      setPageSize(newPageSize);
      setCurrentPage(1);
      fetchUsers(1, newPageSize, search);
   };

   const columns = [
      { name: 'Name', selector: (row: User) => row.name, sortable: true },
      { name: 'Email', selector: (row: User) => row.email, sortable: true },
      {
         name: 'Terakhir Dibuat',
         selector: (row: User) => readableDate(row.created_at),
         sortable: true,
      },
      {
         name: 'Status',
         cell: (row: User) =>
            row.deleted_at ? (
               <Badge typeBadge="error" text="Disabled" />
            ) : (
               <Badge typeBadge="success" text="Active" />
            ),
         sortable: true,
      },
      { name: 'Address', selector: (row: User) => row.address, sortable: true },
      {
         name: 'Actions',
         cell: (row: User) => (
            <>
               <Link
                  to={`/admin/users/${row.id}`}
                  className="mb-2 me-2 rounded-lg bg-yellow-400 px-2.5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300"
               >
                  <Pencil size={16} strokeWidth={1.5} />
               </Link>
               &nbsp;
               <button className="mb-2 me-2 rounded-lg bg-red-700 px-2.5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300">
                  <Trash2 size={16} strokeWidth={1.5} />
               </button>
            </>
         ),
      },
   ];

   return (
      <div>
         <div className="mb-5 flex flex-row-reverse">
            <Link
               to="/admin/users/new"
               className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
               Create Users
            </Link>
         </div>
         <div className="mb-5 flex flex-row-reverse items-center gap-4">
            {/* Search Input */}
            <input
               type="text"
               placeholder="Search users..."
               className="rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-gray-400"
               onChange={(e) => handleSearch(e.target.value)} // Panggil debounce function
            />
         </div>

         {/* DataTable */}
         <DataTable
            columns={columns}
            data={users}
            progressPending={loading}
            progressComponent={<CustomLoader />}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={(page) => setCurrentPage(page)}
            paginationPerPage={pageSize}
            onChangeRowsPerPage={(newPageSize) =>
               handlePageSizeChange(newPageSize)
            }
            theme="shadcn"
         />
      </div>
   );
}
