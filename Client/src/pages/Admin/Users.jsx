/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import BasicTable from "../../components/AdminComponents/BasicTable";
import { base_url } from "../../Utils/baseUrl";
import { FaEye } from "react-icons/fa";
import { List } from "@mui/material";
import { MdBlockFlipped } from "react-icons/md";
import { Space, Switch } from "antd";
import { CgUnblock } from "react-icons/cg";
import { config } from "../../Utils/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import Select from 'react-select';
import RefreshButton from "../../components/reusablesUI/RefreshButton";
import  AnimatedDeleteButton from "../../components/Ui/AnimatedDeleteButton"

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
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [templateId, setTemplateId] = useState();
  const [senderId, setSenderId] = useState();
  const [entityId, setEntityId] = useState();
  const [message, setMessage] = useState();

  const permissionOptions = [
    {value: 'dashboard', label: 'Dashboard'},
    {value: 'users', label: 'Users'},
    {value: 'contact us', label: 'Contact Us'},
    {value: 'orders', label: 'Orders'},
    {value: 'products', label: 'Products'},
    {value: 'blogs', label: 'Blogs'},
    {value: 'coupon', label: 'Coupon'},
    {value: 'Quotation', label: 'Quotation'},
  ];

  const toggleModalHandler = useCallback(() => {
    setShowSmsModal(prev => !prev);
  }, []);

  const sendSms = async (usersMobile) => {
    try {
      const response = await fetch(base_url + "sms/send", {
        method: "POST",
        ...config,
        body: JSON.stringify({
          mobiles: usersMobile,
          templateId,
          senderId,
          entityId,
          message
        }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Message sent successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateAccess = async (id, permissions) => {
    const allowedRoutes = permissions.map(p=> p.value);
    try{
      const response = await fetch(base_url+'user/edit-access', {
        method: 'POST',
        ...config,
        body: JSON.stringify({
          id: id,
          allowedRoutes: allowedRoutes
        })
      });
      const data = await response.json();
      if(!data.success){
        throw new Error(data.message);
      }

      toast.success(data.message);
      FetchUsers();
    }
    catch(err){
      toast.error(err.message);
    }
  }

  const sendSmsToSelected = async (e) => {
    e.preventDefault();

    if (!templateId && !templateId?.trim?.length > 0) {
      toast.error('Please fill the Template ID field');
      return;
    }
    if (!senderId && !senderId?.trim?.length > 0) {
      toast.error('Please fill the Sender ID field');
      return;
    }
    if (!entityId && !entityId?.trim?.length > 0) {
      toast.error('Please fill the Entity ID field');
      return;
    }
    if (!message && !message?.trim?.length > 0) {
      toast.error('Please fill the message field');
      return;
    }

    const allUsers = document.getElementsByClassName("user-select");
    const selectedUsers = Array.from(allUsers).filter((user) => user.checked);

    if (selectedUsers.length === 0) {
      toast.error("Please select atleast 1 user");
      return;
    }

    const selectedUserMobiles = selectedUsers.map((user) => user.value);

    sendSms(selectedUserMobiles);
  };

  const sendSmsToAll = async (e) => {
    e.preventDefault();

    if (!templateId && !templateId?.trim?.length > 0) {
      toast.error('Please fill the Template ID field');
      return;
    }
    if (!senderId && !senderId?.trim?.length > 0) {
      toast.error('Please fill the Sender ID field');
      return;
    }
    if (!entityId && !entityId?.trim?.length > 0) {
      toast.error('Please fill the Entity ID field');
      return;
    }
    if (!message && !message?.trim?.length > 0) {
      toast.error('Please fill the message field');
      return;
    }

    const allUsersMobile = users.map((user) => user.mobile);

    if (users.length === 0) {
      toast.error("No users found");
      return;
    }

    sendSms(allUsersMobile);
  };

  const columns = useMemo(() => [
    {
      header: "Select",
      accessorKey: "select",
      cell: ({ row }) => {
        return (
          <div className="container">
            <input
              type="checkbox"
              className="user-select"
              value={row.original.mobile}
            />
            <span className="checkmark"></span>
          </div>
        );
      },
    },
    {
      header: "Sr.No.",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{(+id) + 1}</span>;
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
            onChange={(e) => {handleRoleChange(row.original._id, e.target.value) }}
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
      header: "Access",
      accessorKey: "access",
      cell: ({ row }) => {
        const [selectedPermissions, setSelectedPermissions] = useState([]);

        return (
          <div className="w-[16rem] gap-2 flex items-center justify-center">
          <Select
            isDisabled={row.original.role !== 'Employee'}
            className="rounded mt-2 disabled:cursor-not-allowed"
            options={permissionOptions}
            placeholder="Select Access"
            value={selectedPermissions}
            onChange={(d) => {
              setSelectedPermissions(d);
            }}
            isSearchable={true}
            isMulti={true}
          />
          <button className="bg-[#0a2440] text-white p-1.5 rounded" onClick={() => updateAccess(row.original._id, selectedPermissions)}>Update</button>
          </div>
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
            >
              <AnimatedDeleteButton />
            </div>
            <div
              onClick={() => fetchUserDetails(row.original._id)}
              className="bg-blue-200 p-2 rounded-md"
            >
              <FaEye className="text-blue-500 " />
            </div>
            <Space direction="vertical">
              <Switch
                onClick={(e) => blockUser(e, row.original._id)}
                checkedChildren={<MdBlockFlipped className="mt-[5px]" />}
                unCheckedChildren={<CgUnblock />}
                defaultChecked={row.original.isBlocked}
              />
            </Space>
          </List>
        );
      },
    },
  ], []);

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
      if(!data.success){
        toast.error(data.message);
        return;
      }
      setUserDetails({
        name: data?.getaUser?.name,
        email: data?.getaUser?.email,
        mobile: data?.getaUser?.mobile,
      });
      setOpen(true);
      setFetchingUser(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const blockUser = async (block, id) => {
    try {
      const response = await fetch(
        `${base_url}user/${block ? "block-user" : "unblock-user"}/${id}`,
        {
          method: "PUT",
          ...config,
        }
      );
      const data = await response.json();
      toast.success(
        `${block ? "Blocked successfully." : "Unblocked successfully."}`
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRoleChange = async (id, role) => {

    try {
      const response = await fetch(`${base_url}user/edit-role/${id}`, {
        method: "PUT",
        ...config,
        body: JSON.stringify({
          role,
        }),
      });
      const data = await response.json();

      if (!data.error && data.status !== "fail") {
        FetchUsers();
        toast.success('Role changed successfully.')
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const FetchUsers = async () => {
    let response = await fetch(`${base_url}user/all-users`);
    let data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };
  useEffect(() => {

    FetchUsers();
  }, [reload]);


  return (
    <div className="p-2">
      <Toaster />
      {showSmsModal && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[50%] h-[30rem] bg-white p-5 rounded-md z-10"
          style={{ boxShadow: "0 0 4px 1px #c3bcbc" }}
        >
          <div className="flex justify-between text-xl cursor-pointer">
            <h1 className="font-bold">Send SMS</h1>
            <div
              onClick={toggleModalHandler}
              className="hover:text-red-500"
            >
              <IoCloseCircleOutline />
            </div>
          </div>

          <div className="">
            <form className="mt-3">
              <div className="mb-3 flex flex-col gap-y-2">
                <label>Template ID</label>
                <input
                placeholder="Enter template ID"
                 value={templateId} onChange={(e) => setTemplateId(e.target.value)} className="border rounded text-lg px-3 py-1" type="number" />
              </div>
              <div className="mb-3 flex flex-col gap-y-2">
                <label>Sender ID</label>
                <input
                placeholder="Enter sender ID"
                 value={senderId} onChange={(e) => setSenderId(e.target.value)} className="border rounded text-lg px-3 py-1" type="text" />
              </div>
              <div className="mb-3 flex flex-col gap-y-2">
                <label>Entity ID</label>
                <input
                placeholder="Enter entity ID"
                value={entityId} onChange={(e) => setEntityId(e.target.value)} className="border rounded text-lg px-3 py-1" type="number" />
              </div>
              <div className="mb-3 flex flex-col gap-y-2">
                <label>Message</label>
                <textarea
                placeholder="Enter your message here"
                 value={message} onChange={(e) => setMessage(e.target.value)} className="border rounded text-lg px-3 py-1" />
              </div>
              <div className="flex justify-end gap-x-2 mb-3">
                <button type="submit"
                  className="p-3 rounded  bg-[#0a2440] border border-[#0a2440] text-white hover:bg-white hover:text-[#0a2440]"
                  onClick={sendSmsToSelected}
                >
                  Send SMS to selected
                </button>
                <button type="submit"
                  className="p-3 rounded  bg-white border border-[#0a2440] text-[#0a2440] hover:bg-[#0a2440] hover:text-white"
                  onClick={sendSmsToAll}
                >
                  Send SMS to all
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {open && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[50%] h-[15rem] bg-white p-5 rounded-md"
          style={{ boxShadow: "0 0 4px 1px #c3bcbc" }}
        >
          <div
            onClick={() => {
              setOpen(false);
              setUserDetails({
                name: null,
                email: null,
                mobile: null,
              });
            }}
            className="flex justify-between text-3xl"
          >
            <h1 className="font-bold text-3xl">User Details</h1>
            <div className="hover:text-red-500">
              <IoCloseCircleOutline />
            </div>
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
      <div className="border flex flex-col  gap-2 rounded-md ">
        <div className="p-4 border-b">
          <h1 className="text-gray-700 font-medium uppercase">Users</h1>
        </div>
      <div className="">
        <BasicTable
          columns={columns}
          data={users}
          toggleModalHandler={toggleModalHandler}
          />
      </div>
          </div>
    </div>
  );
};

export default Users;
