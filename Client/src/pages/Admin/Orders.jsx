// import React from 'react'
import BasicTable from "../../components/AdminComponents/BasicTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import Select from "react-select";
// import Ordata from "../../MOCK_DATA (4).json"
import { FaDownload, FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import {config} from "../../Utils/axiosConfig"
import moment from "moment"
import Loader from "../../components/reusablesUI/Loader"

const orderStates = [
  "Pending",
  "Processing",       
  "Shipped",          
  "Out for Delivery", 
  "Delivered",        
  "Cancelled",        
  "Returned",         
  "Refunded",        
];



const Orders = () => {
  const [search , setSearch] = useState('');
  let statusOptions = [{value: '', label: 'All'}]
  const [reload, setReload] = useState(false);
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
  const [Order , setOrder] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([]);
  console.log(Order)
  // coloumns
  const columns = [
    {
      header: "Sr No.",
      accessorKey: "id",
      cell: ({ row }) => {
        console.log(row)
        const id = row.id;
        return <span>{+id + 1}</span>;
      },
    },
    {
      header: "OrderID",
      accessorKey: "orderId",
    },
    {
      header: "Date",
      accessorKey: "Order_date",
      cell:({row})=>{
        // 
        console.log(row)
        const date = row.original.createdAt
        // return <span>{date}</span>;
        return <span>{moment(date).format('DD/MM/YYYY hh:mm')}</span>;
      }
    },
    {
      header: "Name",
      accessorKey: "users",
    },
    {
      header: "Invoice No",
      accessorKey: "invoiceNo",
    },
    {
      header: "Products",
      accessorKey: "cartItems",
    },
    {
      header: "Quantity",
      accessorKey: "cartItems",
      cell:({row})=>{
        const quantity = row.original.products?.count
        return <span>{quantity}</span>;
      }
    },
    {
      header: "TransactionID",
      accessorKey: "transactionId",
    },
    {
      header: "Amount",
      accessorKey: "total",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
        header:"Order Status",
        cell:({ row }) => {
          const orderStatus = row.original.status
        return (
          <>
          {
            orderStatus === "Processing" ? <span className="bg-red-500 text-red-200 p-2 font-bold">Pending</span>:<span className="bg-green-500 text-grren-200 font-bold p-2">Approved</span>
          }
          </>
        );
      },
    },
    {
      header: "Action",
      cell: ({row}) => {
      return ( <div className="flex w-full justify-around  cursor-pointer ">
          <div className="bg-red-200 p-2 rounded-md" title="delete order" onClick={() => deleteProduct(row.original._id)}>
          <FaTrash className="text-red-500" />
          </div>
         <div className="bg-green-200 p-2 rounded-md" title="download invoice">
         <FaDownload className="text-green-500" />
         </div>
        </div>)
    },
    },
  ];

  // delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${base_url}order/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      console.log(data)
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (!data.success) {
        toast.success(data.message);
        return;
      }
      setReload((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    const FetchOrders = async () => {
      setIsLoading(true); // Start loader
  
      try {
        const response = await fetch(`${base_url}order`);
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrder(data.data);
        setFilteredData(data.data)
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders, please try again later.");
      } finally {
        setIsLoading(false); // Stop loader
      }
    };
  
    FetchOrders();

  
    // Cleanup function to cancel any ongoing requests when the component unmounts
    return () => {
      // If you are using libraries like axios, you can cancel the request here.
      // Not necessary with fetch, unless you're managing abort controllers.
    };
  }, [base_url, reload]); // Added dependency in case `base_url` changes
  
  // filter by date
   const filterByDate = () => {
     if (startDate || endDate) {
       const results = Order.filter((order) => {
         const orderDate = new Date(order.Order_date);
         const start = new Date(startDate);
         const end = new Date(endDate);
         return (
           (!startDate || orderDate >= start) && (!endDate || orderDate <= end)
         );
       });
       setFilteredData(results);
     } else {
       setFilteredData(Order);
     }
   };


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
      const results = Order.filter(order => order.sataus.toLowerCase() === status.toLowerCase());
      setFilteredData(results);
    }
    else{
      setFilteredData(Order);
    }
  };

  const searchByIdEmailName = ()=>{
    if(search.trim() === ''){
      setFilteredData(Order);
    }
    else{
      const results = Order.filter(order => (
        (order?.id.toString() === search.trim()) || order?.orderd_by?.toLowerCase().includes(search.trim().toLowerCase()) || order?.email?.toLowerCase()?.includes(search.trim().toLowerCase())
      ));
      setFilteredData(results)
    }
  }

  useEffect(() => {
    searchByIdEmailName();
    filterByDate();
  }, [search, startDate, endDate]);

   const handleStartDateChange = (e) => {
     setStartDate(e.target.value);
   };

   const handleEndDateChange = (e) => {
     setEndDate(e.target.value);
   };

  return (
    <>
      <Toaster />
      <div className="mt-5 px-5 flex flex-col justify-around gap-12 items-center  ">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Orders</h1>
        </div>
      </div>
      {/* table col */}
      <div className="mt-5 px-5 w-full  rounded-md  max-h-max ">
        <div className="flex items-center justify-between p-4 bg-[#0a2440] text-white  rounded-md ">
          <h1 className="font-bold text-xl">Order information</h1>
        </div>
        <div className="flex flex-wrap items-center justify-around mt-4 gap-4">
  {label.map((item) => (
    <div className="w-full sm:w-auto" key={item.id}>
      <label htmlFor="" className="uppercase block mb-1">
        {item.label}
      </label>

      <Select
        onChange={(d) => sortByStatus(d.value)}
        className="w-full sm:w-[200px]"
        options={statusOptions}
      />
    </div>
  ))}

  <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
    <div className="flex flex-col w-full sm:w-auto">
      <label htmlFor="" className="uppercase block mb-1">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        className="border-[1px] border-black/30 p-2 h-10 w-full sm:w-[20rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2"
      />
    </div>
    <div className="flex flex-col w-full sm:w-auto">
      <label htmlFor="" className="uppercase block mb-1">
        End Date
      </label>
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className="border-[1px] border-black/30 p-2 h-10 w-full sm:w-[20rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2"
      />
    </div>
  </div>

  <div className="flex flex-col w-full sm:w-auto">
    <label htmlFor="" className="uppercase block mb-1">
      Search
    </label>
    <div className="relative w-full sm:w-[20rem]">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-[1px] border-black/30 p-2 h-10 w-full rounded-[3px] focus:border-blue-500 outline-none focus:border-2"
        placeholder="id / name / email"
      />
      <div className="absolute top-3 right-4">
        <FaSearch />
      </div>
    </div>
  </div>
</div>
        <div className="w-full">
          {isLoading && Order.length === 0 ? (
            <Loader />
          ) : (
            <BasicTable columns={columns} data={filteredData || []} />
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
