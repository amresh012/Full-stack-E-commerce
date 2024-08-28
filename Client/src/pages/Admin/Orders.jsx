// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import { BsThreeDotsVertical } from "react-icons/bs";
import Ordata from "../../MOCK_DATA (4).json"
import { FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { useEffect, useLayoutEffect, useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import Select from 'react-select';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "return":
      return "bg-red-200 p-2 text-red-500 rounded-md w-full  uppercase"; // Red color for "Return"
    case "cod":
      return "text-yellow-500 bg-yellow-200 p-2 w-full rounded-md uppercase"; // Yellow color for "COD"
    case "not processed":
      return "text-gray-500 bg-gray-200 p-2 rounded-md w-full uppercase"; // Gray color for "Not Processed"
    case "shipped":
      return "text-blue-500  bg-blue-200 p-2 w-full rounded-md uppercase"; // Blue color for "Shipped"
    case "out of delivery":
      return "text-purple-500  bg-purple-200 p-2 w-full rounded-md uppercase"; // Purple color for "Out Of Delivery"
    case "cancelled":
      return "text-black  bg-black/20 p-2 rounded-md w-full uppercase"; // Black color for "Cancelled"
    default:
      return "text-gray-800  bg-gray-200 p-2 rounded-md uppercase"; // Default color
  }
};

const handleDelete = ()=>{
  
}


const columns = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.id;
      return <span>{id}</span>;
    },
  },
  {
    header: "Invoice No.",
    accessorKey: "Invoice",
  },
  {
    header: "Orderd By",
    accessorKey: "orderd_by",
  },
  {
    header: "Contact Details",
    accessorKey: "mobile",
  },
  {
    header: "Amount in Rs",
    accessorKey: "Amount",
  },
  {
    header: "Order Date",
    accessorKey: "Order_date",
  },
  {
    header: "Status",
    accessorKey: "sataus",
    cell: ({ row }) => {
      const status = row.original.sataus;
      return <span className={getStatusColor(status)}>{status}</span>;
    },
  },
  {
    header: "Action",
    cell: ({row}) => {

    return ( <div className="flex w-full justify-around gap-2 cursor-pointer ">
        <div className="bg-red-200 p-2 rounded-md" onClick={handleDelete}>
        <FaTrash className="text-red-500" />
        </div>
       <div className="bg-blue-200 p-2 rounded-md">
       <FaEye className="text-blue-500" />
       </div>
      </div>)
  },
  },
];


const Orders = () => {
  const [search , setSearch] = useState('');
  const statusArray = Ordata.map(item => item.sataus);
  const UniqueStatus = new Set(statusArray);
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
  // status 
  // const statusCount = Order.reduce((acc, item) => {

  //   const status = item.sataus;
  //   if (acc[status]) {
  //     acc[status]++;
  //   } else {
  //     acc[status] = 1;
  //   }
  //   return acc;
  // }, {});

  const label = [
    {
      id: 2,
      label: "Status By",
      // data: [...UniqueStatus],
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
 <div className='flex flex-col justify-around gap-12 items-center border-2 shadow-md h-auto rounded-md  mx-8 mt-4 p-4'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Orders</h1>
        </div>
    </div>
      {/* table col */}
      <div className=" w-full  rounded-md p-4 max-h-max ">
        <div className="flex items-center justify-between px-4 py-4 border-2 bg-[#0a2440] text-white mx-4 rounded-md ">
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
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={item.data}
                sx={{ width: 400 }}
                renderInput={(params) => (
                  <TextField  onChange={()=>sortByStatus(params.inputProps.value)} onSelectCapture={()=>sortByStatus(params.inputProps.value)} {...params} label={item.showlabel} />
                )}
              /> */}
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
                className="border-[1px] border-black/30 p-2 h-14 w-[20rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2 relative"
                placeholder="id / name / email"
              />
              <div className="absolute top-5 right-4">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4 border-2 mt-4 rounded-md  shadow-md ">
          <BasicTable columns={columns} data={filteredData} />
        </div>
      </div>
    </>
  );
}

export default Orders

