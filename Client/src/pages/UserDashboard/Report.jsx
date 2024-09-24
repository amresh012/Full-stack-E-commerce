import { useEffect, useState } from "react";
import { OrderApi } from "../../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx/xlsx.mjs';
import BasicTable from "../../components/AdminComponents/BasicTable"
import moment from "moment";

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
    header: "OrderID",
    accessorKey: "order_id",
  },
  {
    header: "Date",
    accessorKey: "Order_date",
    cell:({row})=>{
      // 
      const date = row?.original?.createdAt
      // return <span>{date}</span>;
      return <span>{moment(date).format('DD/MM/YYYY hh:mm a')}</span>;
    }
  },
  {
    header: "Name",
    accessorKey: "users",
    cell: ({ row }) => {
      const name = row.original.users.name;
      return <span>{name}</span>;
    }
  },
  // {
  //   header:"Image",
  //   accessorKey:"products",
  //   cell:({row})=>{
  //     console.log(row)
  //     const imageUrl = row.original.products?.product?.images[0]
  //     console.log(imageUrl)
  //     return <img src={imageUrl} alt="image" style={{width:50,height:50}}/>
  //   }
  // },
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
  },
  {
      header:"Order Status",
      cell:({ row }) => {
        const orderStatus = row.original.status
      return (
        <>
        {
          orderStatus === "Success" ? <span className="bg-red-500 text-red-200 p-2 font-bold">Pending</span>:<span className="bg-green-500 text-grren-200 font-bold p-2">Approved</span>
        }
        </>
      );
    },
  },
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






const GenerateReport = () => {
  const user = useSelector((st) => st.auth?.user);
  console.log(user)

  const transactions = useSelector((st) => st.userorder?.orders);
  const dispatch = useDispatch();
  console.log(transactions.data)
  useEffect(() => {
    dispatch(OrderApi());
  }, [dispatch,user]);


  const specificData = transactions?.data.map((transaction) => ({
    id: transaction._id, // For example, transaction ID
    amount: transaction.total, // For example, transaction amount
    date: transaction.createdAt,
    invoiceNo:transaction.invoiceNo, // For example, transaction date
  }));

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(specificData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };
  const [filteredTransactions, setFilteredTransactions] = useState(transactions?.data);
  const [filterAddress, setFilterAddress] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [categoryReport, setCategoryReport] = useState({});
  const [productCountReport, setProductCountReport] = useState({});
  const [addressReport, setAddressReport] = useState({});
  

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(
        transactions?.data?.map((t) => t.products.map((p) => console.log(p.subcategory)))
      ),
    ];
    const uniqueAddresses = [...new Set(transactions?.data?.map((t) => t.address))];
    setCategories(uniqueCategories);
    setAddresses(uniqueAddresses);

    generateReports(transactions.data);
  }, [transactions]);

  const generateReports = (data) => {
    const categoryReportData = {};
    data?.forEach((transaction) => {
      transaction.products.forEach((product) => {
        if (!categoryReportData[product.category]) {
          categoryReportData[product.category] = 0;
        }
        categoryReportData[product.category]++;
      });
    });
    setCategoryReport(categoryReportData);

    // Generate product count report
    const productCountReportData = {};
    data?.forEach((transaction) => {
      productCountReportData[transaction.transactionId] =
        transaction.products.length;
    });
    setProductCountReport(productCountReportData);

    // Generate address report
    const addressReportData = {};
    data?.forEach((transaction) => {
      const address = transaction.address;
      if (!addressReportData[address]) {
        addressReportData[address] = 0;
      }
      addressReportData[address] += transaction.products.length;
    });
    setAddressReport(addressReportData);
  };
  const handleFilter = () => {
    const filtered = transactions.filter(
      (transaction) =>
        (filterAddress === "" || transaction.address.includes(filterAddress)) &&
        (filterCategory === "" ||
          transaction.products.some((product) =>
            product.category.includes(filterCategory)
          ))
    );
    setFilteredTransactions(filtered);

    // Generate reports based on filtered data
    generateReports(filtered);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between w-[75vw] items-center mb-2">
        <h1 className="h1 text-blue-500 font-bold">Generate report</h1>
        <button onClick={handleDownload} className="bg-[#0a2444]  p-2 text-white rounded-md">
          Download Report
        </button>
      </div>
      <div className="mb-4 ">
        <h2 className="text-2xl font-bold mb-2">Category Report</h2>
        <ul>
          {Object.entries(categoryReport).map(([category, count]) => (
            <li className="text-gray-600 text-xl font-semibold" key={category}>
              {category}: {count} products
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Address Report</h2>
        <ul>
          {/* {Object.entries(addressReport).map(([address, count]) => {
            const addre = user?.find((ele) => ele._id === address)
            const frmtadr = `${addre?.adr} ${addre?.city} ${addre?.pincode} ${addre?.state}`
            return (
              <li className="text-gray-500 text-xl font-semibold" key={address}>
                {frmtadr}:{" "}
                <span className="text-blue-500 text-xl font-bold">
                  {" "}
                  {count} products{" "}
                </span>
              </li>
            );
          })} */}
        </ul>
      </div>

      <div className="flex mb-4">
        {/* <select
          value={filterAddress}
          onChange={(e) => setFilterAddress(e.target.value)}
          className="mr-2 w-[30vw] p-2 border border-gray-300"
        >
          <option value="">All Addresses</option>
          {user?.map((address, ids) => (
            <option key={ids} value={address._id}>
              <div>
                {address.adr} ,{address.pincode}, {address.state},{" "}
                {address.city}
              </div>
            </option>
          ))}
        </select> */}

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="mr-2 w-[30vw] p-2 border text-red-500 border-gray-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          style={{ textWrap: "noWrap" }}
          onClick={handleFilter}
          className="bg-[#0a2444] hover:bg-blue-700 text-white font-bold  px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
      <div className="w-[80%]">
      <BasicTable columns={columns} data={filteredTransactions || []}/>
      </div>
    </div>
  );
};

export default GenerateReport;