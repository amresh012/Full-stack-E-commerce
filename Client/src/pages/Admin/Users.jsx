/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl';
import { FaEye,  FaTrash } from 'react-icons/fa';
import { List } from '@mui/material';
import { MdBlockFlipped } from "react-icons/md";
import { Space, Switch } from "antd";
import { CgUnblock } from "react-icons/cg";

const columns = [
  {
    header: "Sr.No.",
    accessorKey: "_id",
    cell: ({ row }) => {
      const id = row.original._id;
      return <span>{id.slice(0, 3)}</span>;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Contact",
    accessorKey: "mobile",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      const [role, setRole] = useState(row.original.role);

      const handleStatusChange = (event) => {
        setRole(event.target.value);
        // Add your logic here to update the status in your data source
      };

      return (
        <select
          value={role}
          onChange={handleStatusChange}
          className="border-2 p-2 outline-none rounded-md border-[#038CCC]"
        >
          <option value="Admin">Admin</option>
          <option value="Bussiness">Employee</option>
        </select>
      );
    },
  },
  {
    header: "Action",
    cell: () => (
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <div className="bg-red-200 p-2 rounded-md">
          <FaTrash className="text-red-500" />
        </div>
        <div className="bg-blue-200 p-2 rounded-md">
          <FaEye className="text-blue-500 " />
        </div>
        <Space direction="vertical">
          <Switch
            checkedChildren={<MdBlockFlipped className="mt-[5px]" />}
            unCheckedChildren={<CgUnblock />}
            defaultChecked
          />
        </Space>
      </List>
    ),
  },
];

const Users = () => {
   const [product, setProduct] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const FetchUsers = async () => {
      let response = await fetch(`${base_url}user/all-users`);
      let data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    FetchUsers();
    
  }, [])
  // console.log(product)
  

  return (
    <>
      <div className=" border-2 mt-10 mx-12 rounded-md shadow-md gap-4 h-auto flex flex-col items-center justify-around  p-6">
        <div className="w-full">
          <h1 className="text-2xl font-bold uppercase">
            List Of Registerd Users on KFS
          </h1>
        </div>
      </div>
      <div className="m-12 shadow-md border-2 rounded-md p-2">
        <BasicTable columns={columns} data={product} />
      </div>
    </>
  );
}

export default Users
