// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import { BsThreeDotsVertical } from "react-icons/bs";
import Ordata from "../../MOCK_DATA (4).json"
import { Autocomplete, TextField } from "@mui/material";
import { FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { useState } from 'react';


const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "return":
      return "bg-red-200 p-2 text-red-500 rounded-md"; // Red color for "Return"
    case "cod":
      return "text-yellow-500 bg-yellow-200 p-2 rounded-md"; // Yellow color for "COD"
    case "not processed":
      return "text-gray-500 bg-gray-200 p-2 rounded-md"; // Gray color for "Not Processed"
    case "shipped":
      return "text-blue-500  bg-blue-200 p-2 rounded-md"; // Blue color for "Shipped"
    case "out of delivery":
      return "text-purple-500  bg-purple-200 p-2 rounded-md"; // Purple color for "Out Of Delivery"
    case "cancelled":
      return "text-black  bg-black/20 p-2 rounded-md"; // Black color for "Cancelled"
    default:
      return "text-gray-800  bg-gray-200 p-2 rounded-md"; // Default color
  }
};


const columns = [
  {
    header: "ID",
    accessorKey: "id",
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
    header: "Status",
    accessorKey: "sataus",
    cell: ({ row }) => {
      const status = row.original.sataus;
      return <span className={getStatusColor(status)}>{status}</span>;
    },
  },
  {
    header: "Action",
    cell: () => (
      <div className="flex w-full justify-around gap-2 ">
        <div className="bg-red-200 p-2 rounded-md">
        <FaTrash className="text-red-500" />
        </div>
       <div className="bg-blue-200 p-2 rounded-md">
       <FaEye className="text-blue-500" />
       </div>
      </div>
    ),
  },
];


const Orders = () => {
  const [search , setSearch] = useState()
  const statusArray = Ordata.map((item) => item.sataus);
  const UniqueStatus = new Set(statusArray);
  // status 
  const statusCount = Ordata.reduce((acc, item) => {

    const status = item.sataus;
    if (acc[status]) {
      acc[status]++;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  const label = [
    {
      id: 1,
      label: "Show By",
      data: ["05", 10, 15, 20, 100],
      showlabel: "Rows",
    },
    {
      id: 2,
      label: "Status By",
      data: [...UniqueStatus],
      showlabel: "status",
    },
  ];

  
  return (
    <>
      <div className="header flex h-12  rounded-md mt-12 p-10 border-2 bg-white shadow-sm justify-between items-center">
        <h1 className="font-bold text-3xl">Orders List</h1>
        <div className="bg-gray-200 p-2 rounded-md text-slate-900">
          admin / Orders
        </div>
      </div>
      {/* <div className="Order-Status py-4 m-4 ">
          <ul className="flex gap-4 flex-wrap items-center justify-start px-16">
            {Object.keys(statusCount)
              .slice(0, 3)
              .map((status) => (
                <li
                  className=" w-[15rem] p-4 rounded-md shadow-md bg-[#038CCC] text-white "
                  key={status}
                >
                  <p className="text-2xl">{statusCount[status]}</p>
                  <h1 className="text-xl">{status}</h1>
                </li>
              ))}
          </ul>
        </div> */}
      {/* table col */}
      <div className=" w-full border rounded-md p-4 max-h-max">
        <div className="flex items-center justify-between px-4 py-4 ">
          <h1 className="font-bold text-xl">Order information</h1>
          <BsThreeDotsVertical />
        </div>
        <div className="flex items-center justify-around mt-4">
          {label.map((item) => (
            <div className="" key={item.id}>
              <label htmlFor="" className="uppercase">
                {item.label}
              </label>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={item.data}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label={item.showlabel} />
                )}
              />
            </div>
          ))}
          <div className="flex flex-col">
            <label htmlFor="" className="uppercase">
              Date
            </label>
            <input
              type="date"
              className="border-[1px] border-black/30 p-2 h-14 w-[12rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="uppercase">
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[1px] border-black/30 p-2 h-14 w-[17rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2 relative"
                placeholder="id / name / email"
              />
              <div className="absolute top-5 right-4">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4 border-2 mt-4 rounded-md  shadow-md">
          <BasicTable columns={columns} data={Ordata} />
        </div>
      </div>
    </>
  );
}

export default Orders

{/* <div className="w-full p-4">
<BasicTable columns={columns} data={Ordata} /> 
</div> */}