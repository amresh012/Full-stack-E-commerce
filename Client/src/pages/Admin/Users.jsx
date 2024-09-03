/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/AdminComponents/BasicTable";
import { base_url } from "../../Utils/baseUrl";
import { FaEye, FaTrash } from "react-icons/fa";
import { List } from "@mui/material";
import { MdBlockFlipped } from "react-icons/md";
import { Space, Switch } from "antd";
import { CgUnblock } from "react-icons/cg";
import { config } from "../../Utils/axiosConfig";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BasicModal from "../../components/Models/Model";
import Loader from "../../components/reusablesUI/Loader";
import { IoCloseCircleOutline } from "react-icons/io5";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: null,
    email: null,
    mobile: null,
  });
  const [open, setOpen] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{(+id)+1}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      invertSorting: true,
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
        return (
          <select
            value={row.original.role}
            onChange={(e)=>handleRoleChange(row.original._id, e.target.value)}
            className="border-2 p-2 outline-none rounded-md border-[#038CCC]"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Employee">Employee</option>
          </select>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => deleteUser(row.original._id)}
              className="bg-red-200 p-2 rounded-md"
            >
              <FaTrash className="text-red-500" />
            </div>
            <div
              onClick={() => fetchUserDetails(row.original._id)}
              className="bg-blue-200 p-2 rounded-md"
            >
              <FaEye className="text-blue-500 " />
              {/* <BasicModal open={open} handleOpen={handleOpen} handleClose={handleClose} icon={<FaEye className="text-blue-500 " />}>
        <div className="w-1/2 h-[50vh]">
          {fetchingUser && <div className='flex items-center justify-center h-[inherit] w-full'>Fetching User Details...</div>}
          {!fetchingUser && <div className=''>
            <div>
              <div><span>Name:</span>{userDetails?.name}</div>
              <div><span>Email:</span>{userDetails?.email}</div>
              <div><span>Mobile:</span>{userDetails?.mobile}</div>
            </div>
          </div>}
          </div>
        </BasicModal> */}
            </div>
            <Space direction="vertical">
              <Switch
                onClick={(e)=>blockUser(e, row.original._id)}
                checkedChildren={<MdBlockFlipped className="mt-[5px]" />}
                unCheckedChildren={<CgUnblock />}
                defaultChecked={row.original.isBlocked}
              />
            </Space>
          </List>
        );
      },
    },
  ];

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${base_url}user/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
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

  const fetchUserDetails = async (id) => {
    try {
      // setFetchingUser(true);
      const response = await fetch(`${base_url}user/${id}`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      // if(!data.success){
      //   toast.error(data.message);
      //   return;
      // }
      setUserDetails({
        name: data?.getaUser?.name,
        email: data?.getaUser?.email,
        mobile: data?.getaUser?.mobile,
      });
      setOpen(true);
      // setFetchingUser(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const blockUser = async (block, id)=>{
    try {
      const response = await fetch(`${base_url}user/${block ? 'block-user' : 'unblock-user'}/${id}`, {
        method: "PUT",
        ...config
      });
      const data = await response.json();
      toast.success(`${block ? 'Blocked successfully.' : 'Unblocked successfully.'}`)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleRoleChange = async (id, role)=>{
    try {
      const response = await fetch(`${base_url}user/edit-role/${id}`, {
        method: "PUT",
        ...config,
        body: JSON.stringify({
          role
        })
      });
      const data = await response.json();
      // console.log(data)
      if(!data.error){
      toast.success('Role changed successfully.')
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const FetchUsers = async () => {
      let response = await fetch(`${base_url}user/all-users`);
      let data = await response.json();
      setUsers(data);
      setIsLoading(false);
    };
    FetchUsers();
  }, [reload]);

  return (
    <div>
      <Toaster />
      {open && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[50%] h-[15rem] bg-white p-5 rounded-md" style={{boxShadow: "0 0 4px 1px #c3bcbc"}}>
          <div onClick={()=>{
            setOpen(false);
            setUserDetails({
              name: null,
              email: null,
              mobile: null,
            })
          }} className="flex justify-between text-3xl">
            <h1 className="font-bold text-3xl">User Details</h1>
            <div className="hover:text-red-500"><IoCloseCircleOutline /></div>
            </div>
          <div>
            {!fetchingUser && (
              <div className="mt-3 text-lg">
                <div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Name:</span>
                    <span>{userDetails?.name}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Email:</span>
                    <span>{userDetails?.email}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Mobile:</span>
                    <span>{userDetails?.mobile}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className=" border-2 mt-10 mx-12 rounded-md shadow-md gap-4 h-auto flex flex-col items-center justify-around p-6 overflow-auto">
        <div className="w-full">
          <h1 className="text-2xl font-bold uppercase">
            List Of Registerd Users on KFS
          </h1>
        </div>
      </div>
      <div className="m-12 shadow-md border-2 rounded-md p-2">
        <BasicTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Users;
