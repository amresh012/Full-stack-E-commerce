import React, { useEffect, useState } from "react";
import { FaUsers, FaShoppingCart, FaEye, FaTrash } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import {
  LineChart,
  DoughnutChart,
} from "../../components/AdminComponents/CChart";
import { base_url } from "../../Utils/baseUrl";
import { toast, Toaster } from "react-hot-toast";
import { config } from "../../Utils/axiosConfig";
import BasicTable from "../../components/AdminComponents/BasicTable";
import moment from "moment"


const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalNewCustomers, setTotalNewCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPaymentsAllTime, setTotalPaymentsAllTime] = useState(0);
  const [totalPaymentsToday, setTotalPaymentsToday] = useState(0);
  const [totalVisitsToday, setTotalVisitsToday] = useState(0);
  const [recentorders , setRecentOrders] = useState([])
 


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
      case "failed":
        return "bg-red-200 p-2 text-red-500 rounded-md w-full  uppercase"; // Red color for "Return"
      case "success":
        return "text-green-500 bg-green-200 p-2 w-full rounded-md uppercase"; // Yellow color for "COD"
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
      header: "OrderId.",
      accessorKey: "orderId",
    },
    {
      header: "Name",
      accessorKey: "orderd_by",
      cell:({row})=>{
        const name = row.original.users.name
        return <span>{name}</span>;
      }
    },
    {
      header: "Contact Details",
      accessorKey: "mobile",
      cell:({row})=>{
        const name = row.original.users.mobile
        return <span>{name}</span>;
      }
    },
    {
      header: "Amount in Rs",
      accessorKey: "amount",
    },
    {
      header: "Order Date",
      accessorKey: "Order_date",
      cell:({row})=>{
        // 
        const date = row.createdAt
        return <span>{moment(date).format('DD/MM/YYYY')}</span>;
      }
    },
    {
      header: "Status",
      accessorKey: "sataus",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
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
      setRecentOrders(data.recentOrders)
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
          <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md min-w-[20rem] h-auto p-2">
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
            <div className="flex flex-col gap-x-4 items-center justify-center border bg-white rounded-md min-w-[17rem] p-2 h-auto">
              <div className="flex items-center mb-2">
                <div className="text-5xl text-[#0a2440]">
                  <MdOutlinePayment />
                </div>
                <p className="text-2xl font-bold">Visitors</p>
              </div>
              <div>
                <div className="flex flex-wrap items-start w-[8rem] gap-2">
                  <div className="flex flex-col items-start  w-full">
                    <p className="text-base -mt-1 text-gray-400 font-bold">
                      Today
                    </p>
                    <p className="text-xl font-bold mt-1 text-[#ff6262]">
                      Rs {totalPaymentsAllTime}
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-base -mt-1 text-gray-400 font-bold">
                      Today
                    </p>
                    <p className="text-xl font-bold mt-1 text-[#ff6262]">
                      Rs {totalPaymentsToday}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-20 mb-5 bg-[#0a2444] w-full p-2 text-white">Recent Orders</h1>
        <div className="w-full">
          <BasicTable columns={columns} data={recentorders || []}/>
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
