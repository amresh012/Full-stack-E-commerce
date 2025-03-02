import { CiBellOn, CiSearch } from "react-icons/ci";
import AccountMenu from "../../components/UserDashComp/AccountMenu";
import { PiMoonLight } from "react-icons/pi";
import RefreshButton from "../../components/reusablesUI/RefreshButton";
import { useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import BasicTable from "../../components/AdminComponents/BasicTable";
import moment from "moment";
import { useEffect, useState } from "react";
import { base_url } from "../../Utils/baseUrl";
import { config } from "../../Utils/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import {
  LineChart,
  DoughnutChart,
} from "../../components/AdminComponents/CChart";
const DashboardNew = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalNewCustomers, setTotalNewCustomers] = useState();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPaymentsAllTime, setTotalPaymentsAllTime] = useState([]);
  const [totalPaymentsToday, setTotalPaymentsToday] = useState([]);
  // const [totalVisitsToday, setTotalVisitsToday] = useState([]);
  const [recentorders, setRecentOrders] = useState([]);
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

  const [activeItem, setActiveItem] = useState("Today");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fetchAdminData = async () => {
    try {
      const response = await fetch(`${base_url}admin`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      if (!data?.success) {
        throw new Error(data?.error || "Something went wrong");
      }
      setRecentOrders(data.recentOrders);
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

      const customersData = months.map((month, ind) => {
        const index = data.customersSummary.findIndex(
          (customer) => customer._id === ind + 1
        );
        if (index === -1) {
          return 0;
        } else {
          return data.customersSummary[index].count;
        }
      });
      setCustomersData({
        labels: months,
        data: customersData,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const User = useSelector((state) => state.auth.user);
  console.log(User);
  let percent = 39;

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
  // order status color
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

  // order table data

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

  // stats data
  const statsData = [
    {
      title: "Total Orders",
      value: totalOrders,
      percent: 20,
      chart: (
        <LineChart
          label={"Orders"}
          labels={ordersData?.labels}
          data={ordersData?.data}
        />
      ),
    },
    {
      title: "New Customers",
      value: totalNewCustomers,
      percent: 20,
      chart: (
        <LineChart
          label={"New Customers"}
          labels={customersData?.labels}
          data={customersData?.data}
        />
      ),
    },
    {
      title: " Products",
      value: totalProducts,
      percent: 20,
    },
    {
      title: "Categories",
      value: totalCategories,
      percent: 20,
      chart: (
        <DoughnutChart
          labels={categoriesData?.labels}
          data={categoriesData?.data}
        />
      ),
    },
  ];
  return (
    <>
      <Toaster />
      <div className="p-4 flex justify-between items-center">
        <h1 className="uppercase text-sm flex flex-col gap-2">
          <span className="text-xl font-bold leading-tight">
            {getGreeting()}! {User?.name}{" "}
          </span>
          Welcome to Admin DashBoard
        </h1>
        <div className="bg-green-200  text-green-500 p-2 rounded-md flex items-center gap-2">
          <button className="">Export Report</button>
          <IoCloudUploadOutline />
        </div>
      </div>
      {/* stats */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
        {statsData.map((item, index) => (
          <div className="border rounded-md grid grid-cols-2" key={index}>
            <div className="bg-white p-4 rounded-md ">
              <h1 className=" font-bold">{item.title}</h1>
              <p className="text-2xl font-light italic">{item.value}</p>
              <p>
                {item.percent > 50 ? (
                  <span className="text-green-500 text-[10px] flex items-center gap-1">
                    <IoIosArrowRoundUp size={55} />
                    {20}% last month
                  </span>
                ) : (
                  <span className="text-red-500 text-[10px] flex items-center gap-1">
                    <IoIosArrowRoundDown size={20} />
                    {23}% last month
                  </span>
                )}
              </p>
            </div>
            <div className=" w-full">{item.chart}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-3 h-full p-4">
        <div className="bg-white border min-w-[20rem] min-h-96 rounded-md h-full ">
          <div className="flex justify-between border-b p-4">
            <h1 className="font-medium text-gray-700 cursor-pointer ">
              Visitors by country
            </h1>
            <div className="bg-purple-300 group relative text-[13px] cursor-pointer  p-2 rounded-md">
              <label htmlFor="text-purple-500">Sort By</label>
              <div className="bg-white p-2 -left-8 border shadow-md text-[13px] list-none min-w-[6.5rem] top-9  absolute rounded-md hidden group-hover:block">
                {["Newest", "Oldest", "Most Popular"].map((item, index) => (
                  <li key={index} className="p-1 hover:bg-gray-100">
                    {item}
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
        {/*  */}
        <div className=" border w-full rounded-md">
          <div className="flex justify-between border-b p-4">
            <h1 className="font-medium text-gray-700">Earning Reports</h1>
            <div className="flex border rounded-md overflow-clip">
              {["Today", "Week", "Month", "Year"].map((item, index) => (
                <div
                  onClick={() => setActiveItem(item)}
                  key={index}
                  className={`bg-white list-none text-[13px] p-2 border-r cursor-pointer  ${
                    activeItem === item ? "bg-purple-200 duration-300" : ""
                  }`}
                >
                  <li>{item}</li>
                </div>
              ))}
            </div>
          </div>
          <div className=""></div>
        </div>
        {/*  */}
        <div className="bg-white border min-w-[20rem] max-w-[2rem] min-h-96 rounded-md h-full ">
          <div className="flex justify-between border-b p-4">
            <h1 className="font-medium cursor-pointer text-gray-700">
              Demographic Data
            </h1>
            <div className="bg-purple-300 group relative text-[13px] cursor-pointer  p-2 rounded-md">
              <label htmlFor="text-purple-500 ">Sort By</label>
              <div className="bg-white p-2 -left-8 border shadow-md text-[13px] list-none min-w-[6.5rem] top-9 absolute rounded-md hidden group-hover:block">
                {["Newest", "Oldest", "Most Popular"].map((item, index) => (
                  <li key={index} className="p-1 hover:bg-gray-100">
                    {item}
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col">
            {/* chart */}
            <div className="">
              <DoughnutChart
                labels={categoriesData?.labels}
                data={categoriesData?.data}
              />
            </div>
            {/* data */}
            <div className="grid grid-cols-2 border-t ">
              <div className="flex flex-col items-center gap-2 p-4 border-r">
                <h1 className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span>Male</span>
                </h1>
                <p className="text-2xl">2,345</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <h1 className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  <span>FeMale</span>
                </h1>
                <p className="text-2xl">2,345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* recent orders */}
      <div className="w-full p-4   flex flex-col gap-4">
        <div className="border flex flex-col rounded-md">
          <div className="flex justify-between items-center px-6 border-b py-2">
            <h1 className="font-medium text-gray-700">Recent Orders</h1>
            <div className="bg-purple-300 group relative  p-2 rounded-md">
              <label htmlFor="" className="text-xs">
                Sort By
              </label>
              <div className="bg-white p-2 cursor-pointer -left-9 border shadow-md text-[13px] list-none min-w-[6rem] top-10  absolute rounded-md hidden group-hover:block">
                {["Newest", "Oldest", "Most Popular"].map((item, index) => (
                  <li key={index} className="p-1 hover:bg-gray-100">
                    {item}
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <BasicTable columns={columns} data={User?.orders || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNew;
