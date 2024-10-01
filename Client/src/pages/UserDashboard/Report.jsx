import { useEffect, useState } from "react";
import { OrderApi } from "../../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx/xlsx.mjs';
import BasicTable from "../../components/AdminComponents/BasicTable"
import moment from "moment";
import toast from "react-hot-toast";

// import TransactionTable from "./TransactionTable";
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
    header: "Name",
    accessorKey: "users",
    cell: ({ row }) => {
      const name = row.original.users.name;
      return <span>{name}</span>;
    }
  },
  {
    header: "Date",
    accessorKey: "Order_date",
    cell:({row})=>{
      const date = row?.original?.createdAt
      return <span>{moment(date).format('DD/MM/YYYY hh:mm a')}</span>;
    }
  },
  {
    header: "OrderID",
    accessorKey: "order_id",
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
      return <span>{status}</span>;
    }
  },
  // {
  //     header:"Order Status",
  //     cell:({ row }) => {
  //       const orderStatus = row.original.status
  //     return (
  //       <>
  //       {
  //         orderStatus === "Success" ? <span className="bg-red-500 text-red-200 p-2 font-bold">Pending</span>:<span className="bg-green-500 text-grren-200 font-bold p-2">Approved</span>
  //       }
  //       </>
  //     );
  //   },
  // },
  // {
  //   header: "Action",
  //   cell: ({row}) => {
  //   return ( <div className="flex w-full justify-around  cursor-pointer ">
  //       <div className="bg-red-200 p-2 rounded-md" title="delete order" onClick={() => deleteProduct(row.original._id)}>
  //       <FaTrash className="text-red-500" />
  //       </div>
  //      <div className="bg-green-200 p-2 rounded-md" title="download invoice">
  //      <FaDownload className="text-green-500" />
  //      </div>
  //     </div>)
  // },
  // },
];

// new code from to filter the coming data based on current logged in user
const GenerateReport = () => {
  const user = useSelector((st) => st.auth?.user);
  const transactions = useSelector((st) => st.userorder?.orders); // Orders data
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OrderApi()); // Fetch orders
  }, [dispatch]);
  const id = localStorage.getItem("id") || user?._id

  // Filter orders belonging to the current logged-in user
  const userOrders = transactions?.data?.filter(
    (transaction) => transaction.users?._id === id // Ensure order's user ID matches the logged-in user's ID
  );

  const specificData = userOrders?.map((transaction) => ({
    id: transaction._id,
    amount: transaction.total,
    date: transaction.createdAt,
    invoiceNo: transaction.invoiceNo,
  }));
  const handleDownload =() => {
    if(specificData.length<=0 || specificData === undefined){
      toast.error("No Data to Download")
      setDisabled(true)
      return
    }
    else{
      setDisabled(false)
    }
    const worksheet = XLSX.utils.json_to_sheet(specificData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  const [filteredTransactions, setFilteredTransactions] = useState(userOrders);
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryReport, setCategoryReport] = useState({});
  const [isdisabled , setDisabled] = useState(false)



  useEffect(() => {
    // const uniqueCategories = [
    //   ...Array.from( new Set(
    //     userOrders?.map((t) => t.products.map((p) => p.category))
    //   )),
    // ];
    const uniqueCategories = [
      ...new Set(
        userOrders?.flatMap((t) => t.products.map((p) => p.product?.category))
      ),
    ];
  

    setCategories(uniqueCategories);
    generateReports(userOrders);
  }, []);

  const generateReports = (data) => {
    const categoryReportData = {};
    data?.forEach((transaction) => {
      transaction.products.forEach((product) => {

        if (!categoryReportData[product?.product?.category]) {
          categoryReportData[product?.product?.category] = 0;
        }
        categoryReportData[product.product.category]++;
      });
    });
    setCategoryReport(categoryReportData);
  };

  const handleFilter = () => {
    const filtered = userOrders.filter(
      (transaction) =>
        filterCategory === "" ||
        transaction.products.some((product) =>
          product.product.category.includes(filterCategory)
        )
    );
    setFilteredTransactions(filtered);
    generateReports(filtered);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between w-[75vw] items-center mb-2">
        <h1 className="h1 text-blue-500 font-bold">Generate report</h1>
        <button onClick={handleDownload} className={isdisabled ? "cursor-not-allowed bg-[#0a2444] opacity-95 p-2 text-white rounded-md" :"bg-[#0a2444] p-2 text-white rounded-md"}>
          Download Report
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Category Report</h2>
        <ul>
          {Object.entries(categoryReport).map(([category, count]) => (
            <li className="text-gray-600 text-xl font-semibold" key={category}>
              {category}: {count} product(s)
            </li>
          ))}
        </ul>
      </div>

      <div className="flex mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="mr-2 w-[30vw] p-2 border border-gray-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="bg-[#0a2444] hover:bg-blue-700 text-white font-bold px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
      <div className="w-[78vw]">
        <BasicTable columns={columns} data={filteredTransactions || []} />
      </div>
    </div>
  );
};

export default GenerateReport;
