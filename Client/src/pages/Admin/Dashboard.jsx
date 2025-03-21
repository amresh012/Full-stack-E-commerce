import  { useEffect, useState } from "react";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
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
// import { FaCalendar, FaClock } from "react-icons/fa6";
import RefreshButton from "../../components/reusablesUI/RefreshButton";
import AccountMenu from "../../components/UserDashComp/AccountMenu";
import { CiBellOn } from "react-icons/ci";
import { PiMoonLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";


const Loader = ()=>{
  return (
    <>
    <div className="flex-col gap-4 w-full flex items-center justify-center">
  <div
    className="w-10 h-10 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      className="w-12 h-12 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>
    </>
  )
}

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalNewCustomers, setTotalNewCustomers] = useState();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPaymentsAllTime, setTotalPaymentsAllTime] = useState([]);
  const [totalPaymentsToday, setTotalPaymentsToday] = useState([]);
  // const [totalVisitsToday, setTotalVisitsToday] = useState([]);
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
        return <span>{+id + 1}</span>;
      },
    },
    {
      header: "OrderID",
      accessorKey: "order_id",
    },
    {
      header: "Name",
      accessorKey: "orderd_by",
      cell: ({ row }) => {
        const name = row.original.users.name;
        return <span>{name}</span>;
      },
    },
    {
      header: "Invoice No",
      accessorKey: "invoiceNo",
    },
    {
      header: "Date",
      accessorKey: "Order_date",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return <span>{moment(date).format("DD/MM/YYYY hh:mm")}</span>;
      },
    },
    {
      header: "Status",
      accessorKey: "sataus",
      cell: ({ row }) => {
        const status = row.original.status;
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
    <div className="overflow-clip bg-gray-100">
      <Toaster />
      <div className="header  flex  flex-col items-start">
        <div className=" w-full p-2 flex justify-between items-center pl-10 bg-white">
          {/* <h1 className="uppercase text-sm flex flex-col gap-2">
          <span className="text-[2vmax]">{getGreeting()}! </span>
            Welcome to Admin DashBoard
            <div className="flex gap-2 border-l items-baseline ">
              <span className="flex gap-2 items-center  p-1 rounded-md">
                <FaCalendar />
                {moment().format("MMMM Do YYYY")}
              </span>
              <span className="flex gap-2 items-center  p-1 rounded-md">
                <FaClock />
                {moment().format("h:mm:ss a")}
              </span>
            </div>
          </h1> */}
          <div className="border rounded-lg overflow-clip w-1/3 pr-2 flex items-center bg-white">
            <input type="search" name="" id="" className="outline-none w-full h-full p-2"
            placeholder="search for products, orders, customers"
             />
            <CiSearch size={20}/>
          </div>
          <div className="grid grid-cols-6 place-items-center">
            <span className="p-2 bg-gray-100 rounded-full text-2xl font-bold"> <PiMoonLight/></span>
            <span className="p-2 bg-gray-100 rounded-full text-2xl  font-bold">  <CiBellOn/></span>
            <span className="p-2 bg-gray-100 rounded-full  font-bold"> <RefreshButton /></span>
            <AccountMenu />
          </div>
        </div>
        <div className="grid grid-cols-1 p-4 place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="mt-5 flex items-center justify-center gap-2 bg-white ">
            <div className="flex gap-x-4 items-center justify-center border rounded-md w-full h-auto p-2">
              <div className="text-5xl text-[#0a2440] w-[6rem] flex justify-center">
                <FaUsers />
              </div>
              <div className="flex-1 ">
                <p className=" font-bold">New Customers</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">
                  This Month
                </p>
                <p className="text-3xl font-bold mt-1 text-[#619edd]">
                  {totalNewCustomers === undefined ? (
                    <Loader />
                  ) : (
                    totalNewCustomers
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-start gap-2">
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md w-full h-auto p-2">
              <div className="text-5xl text-[#0a2440] flex justify-center w-[6rem]">
                <FaShoppingCart />
              </div>
              <div className="flex-1">
                <p className=" font-bold">Total Orders</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">Today</p>
                <p className="text-3xl font-bold mt-1 text-[#ce7cff]">
                  {totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-start gap-2">
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md w-full h-auto p-2">
              <div className="text-5xl text-[#0a2440] w-[6rem] flex justify-center">
                <AiFillProduct />
              </div>
              <div className="flex-1">
                <p className=" font-bold">Total Products</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">
                  All Time
                </p>
                <p className="text-3xl font-bold mt-1 text-[#ff7c7c]">
                  {totalProducts === undefined ? <Loader /> : totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-start gap-2">
            <div className="flex gap-x-4 items-center justify-center border bg-white rounded-md w-full h-auto p-2">
              <div className="text-5xl text-[#0a2440] w-[6rem] flex justify-center">
                <BiSolidCategory />
              </div>
              <div className="flex-1">
                <p className=" font-bold">Total Categories</p>
                <p className="text-base -mt-1 text-gray-400 font-bold">
                  All Time
                </p>
                <p className="text-3xl font-bold mt-1 text-[#4cd54b]">
                  {totalCategories === undefined ? <Loader /> : totalCategories}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 col-span-1 lg:col-span-2 xl:col-span-4 flex flex-col gap-x-4 items-center justify-center border bg-white rounded-md w-full p-2 h-auto">
            <div className="flex items-center mb-2">
              <div className="text-3xl text-[#0a2440]">
                <MdOutlinePayment />
              </div>
              <p className=" font-bold ml-2">Payments</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-4">
                <div className="border-r pr-3">
                  <p className="text-base -mt-1 text-gray-400 font-bold">
                    All Time
                  </p>
                  <p className="text-3xl font-bold mt-1 text-[#ff6262]">
                    Rs{" "}
                    {totalPaymentsAllTime.length === 0 ? (
                      <Loader />
                    ) : (
                      totalPaymentsAllTime
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-base -mt-1 text-gray-400 font-bold">
                    Today
                  </p>
                  <p className="text-3xl font-bold mt-1 text-[#ff6262]">
                    Rs{" "}
                    {totalPaymentsToday.length === 0 ? (
                      <Loader />
                    ) : (
                      totalPaymentsToday
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* order & payment */}
       <div className="grid grid-cols-2  p-4 gap-4 w-full">
        <div className="bg-white">
        <h1 className="text-xl mb-5  w-full p-2 ">
          Recent Payments
        </h1>
        <div className="w-full">
          <BasicTable columns={columns} data={recentorders || []} />
        </div>
        </div>
        <div className="bg-white">
        <h1 className="text-xl mb-5  w-full p-2">
          Recent Orders
        </h1>
        <div className="w-full">
          <BasicTable columns={columns} data={recentorders || []} />
        </div>
        </div>
       </div>
{/* charts */}
    <div className="p-4 w-full">
    <h1 className="text-3xl  font-bold mt-20 mb-5 bg-[#0a2444] w-full p-2 text-white">
          Summary
        </h1>
    </div>
        <div className="space-y-3 p-4 grid grid-cols-2 gap-2 w-full">
          
          <div className="border rounded-md  w-full p-4">
          <div className="text-xl font-light bg-[#0a2444] w-full p-2 text-white">
          Orders
            </div>
            <div className="mt-4 w-full">
              <LineChart
                label={"Orders"}
                labels={ordersData?.labels}
                data={ordersData?.data}
              />
            </div>
          </div>
          <div className="border rounded-md  w-full p-4">
            <div className="text-xl font-light bg-[#0a2444] w-full p-2 text-white">
              Customers
            </div>
            <div className="mt-4 w-full">
              <LineChart
                label={"New Customers"}
                labels={customersData?.labels}
                data={customersData?.data}
              />
            </div>
          </div>
          <div className="border rounded-md  w-full p-4">
            <div className="text-xl font-light bg-[#0a2444] w-full p-2 text-white">
              Categories
            </div>
            <div className="mt-4 mx-auto">
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
