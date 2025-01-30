import { useEffect, useState } from "react"
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { User } from "../../types/UserTypes";
import Badge from "../../components/Badge";
import readableDate from "../../helper/dateHumans";


const CustomLoader = () => (
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
)

export default function AdminUsers() {
  const [users, setUsers] =  useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  
  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);


  const fetchUsers = (page: number, size = pageSize) => {
    setLoading(true);
    api.get('/admin/users', {
      params: {
        page,
        pageSize: size
      }
    }).then(({data})=> {
      setUsers(data.data)
      setTotalRows(data.total)
      setLoading(false);
      toast.success("Berhasil Mengambil Data Users")
    }).catch(err => {
      toast.error(`Error Message : ${err}`)
    })
  }

  const handlePageSizeChange = (newPageSize : number) => {
    setPageSize(newPageSize); // Perbarui ukuran halaman
    setCurrentPage(1); // Reset ke halaman pertama
    fetchUsers(1, newPageSize); // Muat ulang data dengan page size baru
  };

  const columns = [
    { name: "Name", selector: (row : User) => row.name, sortable: true },
    { name: "Email", selector: (row : User) => row.email, sortable: true },
    { name: "Terakhir Dibuat", selector: (row : User) => readableDate(row.created_at), sortable: true },
    { name: "Status", cell: (row : User) => (
        row.deleted_at ? (<Badge typeBadge="error" text="Disabled"/>) : (<Badge typeBadge="success" text="Active" />)
    ), sortable: true },
    { name: "Address", selector: (row : User) => row.address, sortable: true },
    {
      name: "Actions",
      cell: (row : User) => (
        <>
          <Link to={`/users/${row.id}`} className="btn-edit">Edit</Link>
          &nbsp;
          <button  className="btn-delete">Delete</button>
        </>
      ),
    },
  ];


    return (
      <div>
          <div>
            
          <DataTable
            columns={columns}
            data={users}
            progressPending={loading}
            progressComponent={<CustomLoader/>}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={(page) => setCurrentPage(page)}
            paginationPerPage={pageSize}
            onChangeRowsPerPage={(newPageSize) => handlePageSizeChange(newPageSize)}
            theme="modernClean"
          />
          </div>
      </div>
    )
}
