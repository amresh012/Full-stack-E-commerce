import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl';
import { List } from '@mui/material';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import {toast, Toaster} from 'react-hot-toast';
import {config} from '../../Utils/axiosConfig';
import { IoCloseCircleOutline } from "react-icons/io5";

const ListProduct = () => {
  const [contactDetails, setContactDetails] = useState({
    name: null,
    email: null,
    mobile: null,
    customResason: null,
    reason: null,
    remarks: null
  });
  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{id}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "fullname",
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
      header: "Reason",
      accessorKey: "reason",
    },
    {
      header: "Action",
      cell:({row})=>
        <List className='flex items-center gap-2 justify-center cursor-pointer'>
         <div onClick={()=>deleteContact(row.original._id)} className="bg-red-200 p-2 rounded-md hover:shadow-md">
          <FaTrash className='text-red-500'/>
         </div>
         <div onClick={()=>fetchQueryDetails(row.original._id)} className="bg-blue-200 p-2 rounded-md hover:shadow-md">
          <FaEye className='text-blue-500'/>
         </div>
           {/* <div className="bg-black/20 p-2 rounded-md hover:shadow-md">
            <FaPen className='text-black'/>
           </div> */}
        </List>
    },
  ];

  const deleteContact = async (id)=>{
    try {
      const response = await fetch(`${base_url}contact/${id}`, {
        method: "DELETE",
        ...config
      });
      const data = await response.json();
      console.log(data)
      if(!data.success){
        toast.error(data.message);
        return;
      }
      
      setReload(prev => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  
  const fetchQueryDetails = async (id) => {
    try {
      // setFetchingUser(true);
      const response = await fetch(`${base_url}contact/${id}`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      if(!data.success){
        toast.error(data.message);
        return;
      }
      setContactDetails({
        name: data?.fullname,
        email: data?.email,
        mobile: data?.mobile,
        customResason: data?.customResason,
        reason: data?.reason,
        remarks: data?.remarks
      });
      setOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  // contact data fetch
  const [contact , setContact] = useState([])
  const [isLoading  ,setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    const FetchContact = async () => {
      let response = await fetch(`${base_url}contact`);
      let data = await response.json();
      setContact(data);
      setIsLoading(false);
    };
    FetchContact();
    // console.log(contact)
  }, [reload])

  return (
    <div>
    <Toaster />
    {open && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[50%] h-[20rem] bg-white p-5 rounded-md overflow-auto" style={{boxShadow: "0 0 4px 1px #c3bcbc"}}>
          <div onClick={()=>{
            setOpen(false);
            setContactDetails({
              name: null,
              email: null,
              mobile: null,
              customResason: null,
              reason: null,
              remarks: null
            })
          }} className="flex justify-between text-3xl">
            <h1 className="font-bold text-3xl">Query Details</h1>
            <div className="hover:text-red-500"><IoCloseCircleOutline /></div>
            </div>
          <div>
            <div className="mt-3 text-lg">
                <div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Name:</span>
                    <span>{contactDetails?.name}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Email:</span>
                    <span>{contactDetails?.email}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Mobile:</span>
                    <span>{contactDetails?.mobile}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Reason:</span>
                    <span>{contactDetails?.reason || contactDetails?.customResason}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Remarks:</span>
                    <span>{contactDetails?.remarks}</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Contact List</h1>
        </div>
    </div>
      <div className="w-full p-8">
      <BasicTable columns={columns} data={contact} />
      </div>
    </div>
  )
}

export default ListProduct
