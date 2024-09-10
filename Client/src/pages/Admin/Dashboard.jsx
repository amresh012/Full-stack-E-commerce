import React, { useEffect, useState } from "react";
import { FaUsers, FaShoppingCart, FaEye, FaTrash } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import {
  LineChart,
  DoughnutChart,
} from "../../components/AdminComponents/CChart";
import BasicTable from "../../components/AdminComponents/BasicTable";
import Ordata from "../../MOCK_DATA (4).json";
import { base_url } from "../../Utils/baseUrl";
import { toast, Toaster } from "react-hot-toast";
import { config } from "../../Utils/axiosConfig";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalNewCustomers, setTotalNewCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPaymentsAllTime, setTotalPaymentsAllTime] = useState(0);
  const [totalPaymentsToday, setTotalPaymentsToday] = useState(0);
 


  const [categoriesData, setCategoriesData] = useState({
    labels: [],
    data: [],
  });

  const [customersData, setCustomersData] = useState({
    labels: [],
    data: [],
  });

  const [ordersData, setOrdersData] = useState({
    labels: [],
    data: [],
  });

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
      greeting = "Good morning!";
    } else if (hour < 18) {
      greeting = "Good afternoon ";
    } else {
      greeting = "Good evening!";
    }

    return greeting;
  }

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
  ];

  const fetchAdminData = async () => {
    try {
      const response = await fetch(`${base_url}admin`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      console.log(data)
      if (!data?.success) {
        throw new Error(data?.error || 'Something went wrong');
      }
      setTotalNewCustomers(data.totalNewCustomers);
      setTotalCategories(data.totalCategories);
      setTotalOrders(data.totalOrders);
      setTotalCategories(data.totalCategories);
      setTotalProducts(data.totalProducts);
      setTotalPaymentsToday(data.totalPaymentsToday);
      setTotalPaymentsAllTime(data.totalPaymentsAllTime);
      

      const categoriesLabels = data?.categoriesSummary.map(
        (category) =>
          category._id.substr(0, 1).toUpperCase() + category?._id.substr(1)
      );
      const categoriesData = data?.categoriesSummary.map(
        (category) => category.count
      );
      setCategoriesData({
        labels: categoriesLabels,
        data: categoriesData,
      });

      const customersData = months.map((month,ind)=>{
        const index = data.customersSummary.findIndex(customer => customer._id === ind+1);
        if(index === -1){
          return 0;
        }
        else{
          return data.customersSummary[index].count;
        }
      })
      setCustomersData({
        labels: months,
        data: customersData
      })
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="">
      <Toaster />
      <div className="header p-4 flex  flex-col items-start">
        <span className="text-[4vmax]">{getGreeting()}! </span>
        <h1 className="uppercase">Welcome to Admin DashBoard</h1>

        <div className="flex justify-start w-[fit-content]">
          <div className="mt-5 flex flex-wrap gap-2">
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md min-w-[17rem] h-auto p-2">
              <div className="text-7xl text-[#0a2440] w-[6rem] flex justify-center">
                <FaUsers />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">New Customers</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">
                  This Month
                </p>
                <p className="text-4xl font-bold mt-1 text-[#619edd]">
                  {totalNewCustomers}
                </p>
              </div>
            </div>
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md min-w-[18rem] h-auto p-2">
              <div className="text-7xl text-[#0a2440] flex justify-center w-[6rem]">
                <FaShoppingCart />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">Total Orders</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">Today</p>
                <p className="text-4xl font-bold mt-1 text-[#ce7cff]">
                  {totalOrders}
                </p>
              </div>
            </div>
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md min-w-[20rem] h-auto p-2">
              <div className="text-7xl text-[#0a2440] w-[6rem] flex justify-center">
                <AiFillProduct />
              </div>
              <di className="flex-1">
                <p className="text-2xl font-bold">Total Products</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">
                  All Time
                </p>
                <p className="text-4xl font-bold mt-1 text-[#ff7c7c]">
                  {totalProducts}
                </p>
              </di>
            </div>
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md min-w-[21rem] h-auto p-2">
              <div className="text-7xl text-[#0a2440] w-[6rem] flex justify-center">
                <BiSolidCategory />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">Total Categories</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">
                  All Time
                </p>
                <p className="text-4xl font-bold mt-1 text-[#4cd54b]">
                  {totalCategories}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-x-4 items-center justify-center border bg-white rounded-md min-w-[17rem] p-2 h-auto">
              <div className="flex items-center mb-2">
                <div className="text-5xl text-[#0a2440]">
                  <MdOutlinePayment />
                </div>
                <p className="text-2xl font-bold">Payments</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <div className="border-r pr-3">
                    <p className="text-base -mt-1 text-gray-400 font-bold">
                      All Time
                    </p>
                    <p className="text-xl font-bold mt-1 text-[#ff6262]">
                      Rs {totalPaymentsAllTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-base -mt-1 text-gray-400 font-bold">
                      Today
                    </p>
                    <p className="text-xl font-bold mt-1 text-[#ff6262]">
                      Rs {totalPaymentsToday}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-20 mb-5 bg-[#0a2444] w-full p-2 text-white">Recent Orders</h1>
        <div className="w-full">
          <BasicTable columns={columns} data={Ordata.slice(0, 5)} />
        </div>

        <h1 className="text-3xl font-bold mt-20 mb-5 bg-[#0a2444] w-full p-2 text-white">Summary</h1>
        <div className="space-y-3 w-full">
          <div className="shadow-md rounded-md  w-full p-4">
            <div className="text-3xl font-light">Orders</div>
            <div className="mt-4 w-full">
            <LineChart label={"Orders"} labels={ordersData?.labels} data={ordersData?.data} />
            </div>
          </div>
          <div className="shadow-md rounded-md  w-full p-4">
            <div className="text-3xl font-light bg-[#0a2444] w-full p-2 text-white">Customers</div>
            <div className="mt-4">
              <LineChart label={"New Customers"} labels={customersData?.labels} data={customersData?.data} />
            </div>
          </div>
          <div className="shadow-md rounded-md  w-full p-4 bg-gray-100">
            <div className="text-3xl font-light bg-[#0a2444] w-full p-2 text-white">Categories</div>
            <div className="mt-4 w-[50%] mx-auto">
              <DoughnutChart
                labels={categoriesData?.labels}
                data={categoriesData?.data}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

// import React, { useState } from 'react'
// import AccountMenu from "../../components/UserDashComp/AccountMenu";
// import { FaSearch } from 'react-icons/fa';
// import { IoNotificationsOutline } from "react-icons/io5";
// import { FaRupeeSign } from "react-icons/fa";
// import { TbMoneybag } from "react-icons/tb";
// import { MdOutlinePayments } from "react-icons/md";
// import { FaUsers } from "react-icons/fa";
// import { GoChecklist } from "react-icons/go";
// import { MdOutlineCorporateFare } from "react-icons/md";
// import { LineChart } from '@mui/x-charts/LineChart';
// import { Chip, Rating } from '@mui/material';
// import { Progress } from 'antd';
// import {Equip1}from "../../assets/images"

// const Dashboard = () => {

//   function getGreeting() {
//     const now = new Date();
//     const hour = now.getHours();
//     let greeting;

//     if (hour < 12) {
//         greeting = "Good morning!";
//     } else if (hour < 18) {
//         greeting = "Good afternoon ";
//     } else {
//         greeting = "Good evening!";
//     }

//     return greeting;
// }

//   return (
//     <>
//      <div className="h-24 flex justify-around  w-full p-4 ">

//           <div className="actions flex justify-end items-center h-full" >
//           {/* <div className="">
//             <IoNotificationsOutline size={30}/>
//           </div>
//           <div className="Acount">
//             <AccountMenu/>
//           </div> */}
//           </div>
//         </div>
//     <div className="flex items-start gap-4 justify-start">
//       <div className="flex flex-col justify-between items-center pl-4 ">
//         {/* section-2 */}
//         <div className="header-right w-full  h-24 p-4">
//         <h1 className='text-3xl'>{getGreeting()}! </h1>
//         <p className='uppercase'>Weclome tO Admin DashBoard</p>
//         </div>
//         <div className="analytics flex gap-2">
//           <div className="total-sales flex flex-col font-bold items-center rounded-md  shadow-md p-4 bg-[#0A2440] text-white">
//            <p className=''>
//            <TbMoneybag size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Revenu</h1>
//             <p className="flex items-center text-2xl">
//               <FaRupeeSign/>
//               <p className="-mt-1">
//                 120,345.00
//               </p>
//             </p>
//           </div>
//           {/* total payments */}
//           <div className="total-sales flex flex-col items-center rounded-md  shadow-md p-4  bg-[#0A2440] text-white font-bold ">
//            <p className=''>
//            <MdOutlinePayments size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Payments</h1>
//             <p className="flex items-center text-2xl">
//               <FaRupeeSign />
//               <p className="-mt-1">
//                 100,345.00
//               </p>
//             </p>
//           </div>
//           {/* total customers */}
//           <div className="total-sales flex flex-col items-center rounded-md  shadow-md p-4  bg-[#0A2440] text-white font-bold ">
//            <p className=''>
//            <FaUsers size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Customers</h1>
//             <p className="flex items-center text-2xl">
//               <p className="-mt-1">
//                 129087
//               </p>
//             </p>
//           </div>
//           {/* total orders */}
//           <div className="total-sales flex flex-col items-center rounded-md  shadow-md p-4 bg-[#0A2440] text-white font-bold w-[6rem]">
//            <p className=''>
//            <GoChecklist size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Orders</h1>
//             <p className="flex items-center text-2xl">
//               <p className="-mt-1">
//                 11287
//               </p>
//             </p>
//           </div>
//         </div>
//         <div className="h-[50vh] w-[50vw] rounded-md border-2 mt-8 shadow-md bg-[#0A2440]">
//          <div className="p-2 text-2xl font-bold text-white">
//          <h1>Sales Graph</h1>
//          </div>
//          <div className="graph ">
//          <LineChart
//                 xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]}]}
//                 series={[
//                     {
//                     data: [1, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8,9],
//                     showMark: ({ index }) => index % 1 === 0,
//                     },
//                     {
//                         data: [4, 3, 6.5, 4.5, 1.9, 5, 11, 4.3, 6, 8,9],
//                         showMark: ({ index }) => index % 2 === 0,
//                     },
//                 ]}
//                 width={750}
//                 height={320}
//                 sx={{padding:"4px",stroke:"white",}}
//               />
//          </div>
//         </div>
//         <div className="h-[15rem] m-2 w-full border-2 mt-6 rounded-md shadow-md"></div>
//       </div>
//       <div className="right-content  mt-[5.5rem] flex-col flex py-2">
//         <div className=" w-[24rem] h-[9rem]  bg-[#0A2440] rounded-md  flex flex-col items-start  justify-start">
//         <div className="text-2xl px-4 py-4 text-white">
//             <h1>Customer Types</h1>
//           </div>
//          <div className="flex px-4 justify-around w-full">
//          <div className="text-white flex items-center gap-2 font-light">
//             <FaUsers size={50}/>
//             <div className="">
//             <p>Individual</p>
//             <span>36%</span>
//             </div>
//           </div>
//           <div className="text-white flex items-center gap-2 font-light">
//             <MdOutlineCorporateFare  size={50}/>
//             <div className="">
//             <p>Bussiness</p>
//             <span>76%</span>
//             </div>
//           </div>
//          </div>
//         </div>
//         <div className=" customer-reviews h-[20rem] w-[24rem] border-2 mt-6 rounded-md shadow-md p-2">
//           <div className="text-2xl p-2">
//             <h1>Customers Reviews</h1>
//           </div>
//           <div className=" flex gpa-12 w-full p-2 justify-center gap-12 ">
//           <Rating name="half-rating" value={4} defaultValue={2.5} precision={0.5} sx={{color:"#038CCC"}} />
//           <p>4.5 out of 5</p>
//           </div>
//           <p className='w-full text-center'>total review 300+</p>
//           <div className="rating">
//             <div className="flex items-center">
//               <p className='w-[5rem]'> 5 star</p>
//               <Progress percent={50} status="active"/>
//             </div>
//             {/*  */}
//             <div className="flex items-center">
//               <p className='w-[5rem]'> 4 star</p>
//               <Progress percent={70} status="active"/>

//             </div>

//             <div className="flex items-center">
//               <p className='w-[5rem]'> 3 star</p>
//               <Progress percent={60} status="active"/>

//             </div>

//             <div className="flex items-center">
//               <p className='w-[5rem]'> 2 star</p>
//               <Progress percent={40} status="active"/>

//             </div>

//             <div className="flex items-center">
//               <p className='w-[5rem]'> 1 star</p>
//               <Progress percent={10} status="active"/>

//             </div>
//           </div>
//         </div>
//         <div className=" top-products  overflow-y-scroll w-[24rem] border-2 mt-6 p-2 rounded-md shadow-md">
//           <div className="flex p-2 text-xl font-bold">
//             <h1>Top Products</h1>
//           </div>
//           <div className="p-2 h-full space-y-2 border-2 rounded-md ">
//             {
//               [...Array(6)].map((_,id)=>(
//                 <div className="border-2  rounded-md flex items-center p2 justify-between gap-2 " key={id}>
//                 <div className="flex items-center gap-2">
//                 <div className="image bg-[#0A2440]/20 w-fit">
//                   <img src={Equip1} alt="" className='h-12 w-12'/>
//                 </div>
//                 <div className="name">
//                   <span>Product name</span>
//                   <p className="price flex uppercase items-center"> <FaRupeeSign/> 12,34.00</p>
//                 </div>
//                 </div>
//                 <Chip label="334"/>
//               </div>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Dashboard
