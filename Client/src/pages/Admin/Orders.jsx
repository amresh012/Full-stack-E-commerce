/* eslint-disable no-unused-vars */
// import React from 'react'
import BasicTable from "../../components/AdminComponents/BasicTable";
import Select from "react-select";
import { FaDownload, FaEye, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import {config} from "../../Utils/axiosConfig"
import moment from "moment"
import Loader from "../../components/reusablesUI/Loader"
import RefreshButton from "../../components/reusablesUI/RefreshButton";
import AnimatedDeleteButton from "../../components/Ui/AnimatedDeleteButton"
import axios from "axios"

const orderStates = ["Processing", "Success", "Order Confirmed", "Shipped", "Delivered"];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "Processing":
      return "bg-red-200 p-1 text-red-100 rounded-md  uppercase"; // Red color for "Return"
    case "success":
      return "text-yellow-500 bg-yellow-100 p-1 rounded-md uppercase"; // Yellow color for "COD"
    case "order confirmed":
      return "text-gray-500 bg-gray-100 word-break rounded-md uppercase"; // Gray color for "Not Processed"
    case "shipped":
      return "text-blue-500  bg-blue-100 p-1 rounded-md uppercase"; // Blue color for "Shipped"
    case "delivered":
      return "text-green-500  bg-green-100 p-1 rounded-md uppercase"; // Black color for "Cancelled"
    default:
      return "text-gray-800  bg-gray-100 p-1 rounded-md uppercase"; // Default color
  }
};


const Orders = () => {
  const [search , setSearch] = useState('');
  // let statusOptions = [{value: '', label: 'All'}]
  const [reload, setReload] = useState(false);
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
  const [Order , setOrder] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([]);


  // coloumns
  const columns = [
    {
      header: "Sr No.",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{+id + 1}</span>;
      },
    },
    {
      header: "OrderID",
      accessorKey: "order_id",
    },
    {
      header: "Date",
      accessorKey: "Order_date",
      cell:({row})=>{
        // 
        const date = row.original.createdAt
        return <span>{moment(date).format('DD/MM/YYYY hh:mm a')}</span>;
      }
    },
    {
      header: "Name",
      accessorKey: "users",
      cell: ({ row }) => {
        const name = row.original?.users?.name;
        return <span>{name}</span>;
      }
    },
    {
      header: "Invoice No",
      accessorKey: "invoiceNo",
    },
    {
      header: "Products",
      accessorKey: "cartItems",
      cell:({row})=>{
        const product_name =  row.original?.products[0]?.product?.name
        return <span>{product_name}</span>
      }
    },
    {
      header: "Quantity",
      accessorKey: "cartItems",
      cell:({row})=>{
        const quantity = row.original.products[0]?.count
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
      cell:({row})=>{
        const status = row.original.status
        return <span  className={getStatusColor(status)}>{status}</span>
      }
    },
    {
        header:"Order Status",
        cell:({ row }) => {
          const orderStatus = row.original.status;
          const invoiceNo = row.original.invoiceNo;
        return (
         <select className="p-1 border" 
         onChange={(e) => editOrderStatus(invoiceNo, e.target.value)}
         >
          {
            orderStates.map((orderstat)=>(
              <option key={orderstat} value={orderstat}>{orderstat}</option>
            ))
          }
         </select>
        );
      },
    },
    {
      header: "Action",
      cell: ({row}) => {
      return ( <div className="flex w-full justify-around  cursor-pointer ">
          <div className="" title="delete order" onClick={() => deleteProduct(row.original._id)}>
          <AnimatedDeleteButton />
          </div>
         <div
          id="invoice-content"
         onClick={()=>{fetchInvoice(row.original?.invoiceNo)}} 
          className="bg-green-200 p-2 rounded-md" title="download invoice">
         <FaDownload className="text-green-500" />
         </div>
        </div>)
    },
    },
  ];

  const fetchInvoice =async (invoiceNo)=>{
    try{
      const response = await axios.get(`${base_url}order/invoice/${invoiceNo}`, config) 
      console.log(response)
      if(response.data.success){
        handlePrint(response?.data?.invoiceData)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  // handlePrint
  const handlePrint = (invoice) => {
    const invoiceContent = document.getElementById("invoice-content");
    if (invoiceContent) {
      const popupWin = window.open("");
      popupWin.document.open();
      popupWin.document.write(`${invoice}`); // Directly write invoice content
      popupWin.print();
    }
  };

 // Edit order status function
const editOrderStatus = async (invoiceNo, status) => {
  try {
    const response = await axios.put(
      `${base_url}order/edit`,
      { status, invoiceNo },
      config
    );
    FetchOrders()
    if (response.data.success) {
      toast.success("Order status updated successfully");
      setReload((prev) => !prev); // Reload the data to reflect changes
    } else {
      toast.error("Failed to update order status");
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error("Error updating order status");
  }
};


  // delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${base_url}order/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      FetchOrders()
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

  const FetchOrders = async () => {
    setIsLoading(true); // Start loader

    try {
      const response = await fetch(`${base_url}order`);
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


  useEffect(() => {
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
         const orderDate = new Date(order.createdAt);
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
      data:[...orderStates],
      showlabel: "status",
    },
  ];


  const sortByStatus = (status)=>{
    if(status !== ''){
      const results = Order.filter(order => order.status.toLowerCase() === status.toLowerCase());
      setFilteredData(results);
    }
    else{
      setFilteredData(Order);
    }
  };
//  searcjh by email/id/name

const searchByIdEmailName = () => {
  if (search.trim() === '') {
    setFilteredData(Order);
  } else {
    const results = Order.filter(order => {
      const id = order?.id?.toString() || '';
      const name = order?.users?.name?.toLowerCase() || ''; // Assuming you're searching for users by name
      const email = order?.email?.toLowerCase() || '';

      return (
        id === search.trim() || 
        name.includes(search.trim().toLowerCase()) || 
        email.includes(search.trim().toLowerCase())
      );
    });
    setFilteredData(results);
  }
};

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
        <div className="mt-2 flex flex-wrap gap-2">
        {label.map((item) => (
          <div className="w-full sm:w-auto" key={item.id}>
            <label htmlFor="" className="uppercase block mb-1">
              {item.label}
            </label>
            <Select
              onChange={(selectedOption) => sortByStatus(selectedOption.value)} // Call sortByStatus with selected status
              className="w-full sm:w-[200px]"
              options={[{ value: '', label: 'All' }, ...orderStates.map(state => ({ value: state, label: state }))]}
            />
          </div>
        ))}

  <div className="flex flex-wrap  gap-2 items-center w-full sm:w-auto">
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
    <div className=" w-full sm:w-[18rem] flex items-center border-[1px] border-black/30 justify-between pr-2">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 outline-none px-2 placeholder:px-2 w-full"
        placeholder="id / name / email"
      />
      <div onClick={searchByIdEmailName} className="cursor-pointer">
        <FaSearch />
      </div>
    </div>
  </div>
</div>
        <div className="w-full">
         <div className="mt-12">
         <RefreshButton/>
         </div>
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
