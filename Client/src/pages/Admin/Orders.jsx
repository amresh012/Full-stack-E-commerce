// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import { BsThreeDotsVertical } from "react-icons/bs";
// import Ordata from "../../MOCK_DATA (4).json"
import { FaDownload, FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import {config} from "../../Utils/axiosConfig"
import moment from "moment"
import Loader from "../../components/reusablesUI/Loader"

const orderStates = [
  "Pending",          // Order has been placed but not yet processed
  "Processing",       // Order is being prepared
  "Shipped",          // Order has been shipped but not yet delivered
  "Out for Delivery", // Order is out for delivery
  "Delivered",        // Order has been delivered to the customer
  "Cancelled",        // Order has been cancelled
  "Returned",         // Order has been returned by the customer
  "Refunded",         // Payment has been refunded to the customer
];


const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${base_url}order/${id}`, {
      method: "DELETE",
      ...config,
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setReload((prev) => !prev);
    toast.success(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};


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
    accessorKey: "orderId",
  },
  {
    header: "Date",
    accessorKey: "Order_date",
    cell:({row})=>{
      // console.log(row)
      const date = row.original
      return <span>{moment(date).format('DD/MM/YYYY hh:mm')}</span>;
    }
  },
  {
    header: "Name",
    accessorKey: "orderd_by",
  },
  {
    header: "Products",
    accessorKey: "cartItems",
    cell:({row})=>{
      const name = row.original.cartItems[0]?._id.name
      return <span>{name}</span>;
    }
  },
  {
    header: "Quantity",
    accessorKey: "cartItems",
    cell:({row})=>{
      const quantity = row.original.cartItems[0]?.quantity
      return <span>{quantity}</span>;
    }
  },
  {
    header: "TransactionID",
    accessorKey: "paymentId",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Status",
    accessorKey: "paymentStatus",
    size: 270,
  },
  {
      header:"Order Status",
      cell:({ row }) => {
      return( 
        <select className="p-2 border-2" required>
          {
            orderStates?.map((stat)=>(
              <option value={stat}>{stat}</option>
            ))
          }
        </select>
    )
    },
  },
  {
    header: "Action",
    cell: ({row}) => {
    return ( <div className="flex w-full justify-around gap-2 cursor-pointer ">
        <div className="bg-red-200 p-2 rounded-md" title="delete order"  onClick={() => deleteProduct(row.original._id)}>
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

const Orders = () => {
  const [search , setSearch] = useState('');
  let statusOptions = [{value: '', label: 'All'}]
  
  const [Order , setOrder] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
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
  
    FetchOrders();
  
    // Cleanup function to cancel any ongoing requests when the component unmounts
    return () => {
      // If you are using libraries like axios, you can cancel the request here.
      // Not necessary with fetch, unless you're managing abort controllers.
    };
  }, [base_url]); // Added dependency in case `base_url` changes
  
  // Log orders only after state is updated
  useEffect(() => {
    // console.log(Order);
  }, [Order]); // Only log when Order is updated

  

  
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
  }

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
         {
          isLoading  && Order.length === 0? <Loader/> : <BasicTable columns={columns} data={filteredData} />
         }
        </div>
      </div>
    </>
  );
}

export default Orders

