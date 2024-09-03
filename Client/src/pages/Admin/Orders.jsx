// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import { BsThreeDotsVertical } from "react-icons/bs";
import Ordata from "../../MOCK_DATA (4).json"
import { FaDownload, FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import Select from 'react-select';

const statusArray = Ordata.map(item => item.sataus);
const UniqueStatus = new Set(statusArray);
const statusOptions = Array.from(UniqueStatus)

const columns = [
  {
    header: "Sr No.",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.id;
      return <span>{(+id)+1}</span>;
    },
  },
  {
    header: "OrderID",
    accessorKey: "Invoice",
    size:300,
  },
  {
    header: "Order Date",
    accessorKey: "Order_date",
  },
  {
    header: "Customer Name",
    accessorKey: "orderd_by",
  },
  {
    header: "Customer Email",
    accessorKey: "email",
  },
  {
    header: "Orderd Products",
    accessorKey: "email",
  },
  {
    header: "Order Status",
    accessorKey: "email",
  },
  {
    header: "Pay Method",
    accessorKey: "email",
  },
  {
    header: "TransactionID",
    accessorKey: "transaction",
  },
  {
    header: "Amount in Rs",
    accessorKey: "Amount",
  },
  {
    header: "Status",
    accessorKey: "sataus",
    cell: ({ row }) => {
      // const status = row.original.sataus;
      return( 
        <select className="p-2 border-2" required>
          {
            statusOptions?.map((stat)=>(
              <option value={stat}>{stat}</option>
            ))
          }
        </select>
      // <span className={getStatusColor(status)}>{status}</span>
    )
    },
    size: 270,
  },
  {
    header: "Action",
    cell: ({row}) => {
    return ( <div className="flex w-full justify-around gap-2 cursor-pointer ">
        <div className="bg-red-200 p-2 rounded-md" title="delete order">
        <FaTrash className="text-red-500" />
        </div>
       <div className="bg-blue-200 p-2 rounded-md" title="View Order Details">
       <FaEye className="text-blue-500" />
       </div>
       <div className="bg-green-200 p-2 rounded-md" title="download invoice">
       <FaDownload className="text-green-500" />
       </div>
      </div>)
  },
  },
];
// delete Order

// const handleDelete = async (id) => {
//   try {
//     const response = await fetch(`${base_url}user/${id}`, {
//       method: "DELETE",
//       ...config,
//     });
//     const data = await response.json();
//     if (!data.success) {
//       toast.error(data.message);
//       return;
//     }
//     setReload((prev) => !prev);
//     toast.success(data.message);
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

const Orders = () => {
  const [search , setSearch] = useState('');
 
  let statusOptions = [{value: '', label: 'All'}]
  statusOptions.push(...Array.from(UniqueStatus).map((status) => {return {value: status, label: status}}));
  const [filteredData, setFilteredData] = useState(Ordata);

  const [Order , setOrder] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  
  useEffect(() => {
    const FetchOrders = async () => {
      let response = await fetch(`${base_url}order`);
      let data = await response.json();
      setOrder(data);
      setIsLoading(false);
    };
    FetchOrders();
    console.log(Order)
    
  }, [])
  const label = [
    {
      id: 2,
      label: "Status By",
      data: [],
      showlabel: "status",
    },
  ];

  const sortByStatus = (status)=>{
    if(status !== ''){
      const results = Ordata.filter(order => order.sataus.toLowerCase() === status.toLowerCase());
      setFilteredData(results);
    }
    else{
      setFilteredData(Ordata);
    }
  }

  const searchByIdEmailName = ()=>{
    if(search.trim() === ''){
      setFilteredData(Ordata);
    }
    else{
      const results = Ordata.filter(order => (
        (order?.id.toString() === search.trim()) || order?.orderd_by?.toLowerCase().includes(search.trim().toLowerCase()) || order?.email?.toLowerCase()?.includes(search.trim().toLowerCase())
      ));
      setFilteredData(results)
    }
  }

  useEffect(()=>{
    searchByIdEmailName();
  }, [search])

  
  
  return (
    <>
    <Toaster/>
 <div className='flex flex-col justify-around gap-12 items-center  '>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Orders</h1>
        </div>
    </div>
      {/* table col */}
      <div className=" w-full  rounded-md  max-h-max ">
        <div className="flex items-center justify-between px-4 py-4 border-2 bg-[#0a2440] text-white  rounded-md ">
          <h1 className="font-bold text-xl">Order information</h1>
          <BsThreeDotsVertical />
        </div>
        <div className="flex items-center justify-around mt-4">
          {label.map((item) => (
            <div className="" key={item.id}>
              <label htmlFor="" className="uppercase">
                {item.label}
              </label>
              <Select onChange={(d)=>sortByStatus(d.value)} className='w-[200px]' options={statusOptions} />
             
            </div>
          ))}
          {/* <div className="flex flex-col">
            <label htmlFor="" className="uppercase">
              Date
            </label>
            <input
              type="date"
              className="border-[1px] border-black/30 p-2 h-14 w-[20rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2"
            />
          </div> */}
          <div className="flex flex-col">
            <label htmlFor="" className="uppercase">
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[1px] border-black/30 p-2 h-10 w-[20rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2 relative"
                placeholder="id / name / email"
              />
              <div className="absolute top-5 right-4">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full  ">
          <BasicTable columns={columns} data={filteredData} />
        </div>
      </div>
    </>
  );
}

export default Orders

