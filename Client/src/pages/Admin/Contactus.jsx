import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl';
import { List } from '@mui/material';
import { FaEye, FaTrash } from 'react-icons/fa';
import {toast, Toaster} from 'react-hot-toast';
import {config} from '../../Utils/axiosConfig';
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from '../../components/reusablesUI/Loader';




const ListProduct = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [details ,setDetails] = useState([])
  console.log(details)
  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row?.id;
        return <span>{(+id)+1}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Contact",
      accessorKey: "mobile",
    },
    {
      header: "Assigned To",
      accessorKey: "name",
      cell:({row})=>{
       const  assignedto= row?.original?.assigned?.name
       return <span>{assignedto}</span>;
      }
    },
    {
      header: "Purpose",
      accessorKey: "purpose",
      cell:({row})=>{
      const purpose = row?.original?.purpose
      return <span className='bg-gray-200 uppercase p-1'>{purpose}</span>
      }
    },
    {
      header: "Query",
      accessorKey: "description",
      cell:({row})=>{
        const desc = row?.original?.description
        return <span>{desc.substring(0,30)}</span>
        }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell:({row})=>{
        const status = row?.original?.status
        return <span className='bg-green-200 p-1'>{status}</span>
      }
    },
    {
      header: "Action",
      cell:({row})=>
        <List className='flex items-center gap-2 justify-center cursor-pointer'>
         <div  onClick={()=>fetchQueryDetails(row.original._id)} className="bg-blue-200 p-2 rounded-md hover:shadow-md">
          <FaEye className='text-blue-500'/>
         </div>
        </List>
    },
  ];
    
  const fetchDetails = async () => {
    try {
      // setFetchingUser(true);
      const response = await fetch(`https://crmkfsbackend.deepmart.shop/api/support/get-all-support`, {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data)
      if(!data.success){
        toast.error(data.message);
        return;
      }
      setContactDetails(data.support);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // modal details
  const fetchQueryDetails = async () => {
    try {
      // setFetchingUser(true);
      const response = await fetch(`https://crmkfsbackend.deepmart.shop/api/support/get-all-support`, {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data)
      if(!data.success){
        toast.error(data.message);
        return;
      }
      setDetails(data.support);
      setOpen(true)
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
    fetchDetails()
    // 
  }, [reload])

  return (
    <div>
    <Toaster />
    {open && (
       <div className="fixed inset-0 flex items-center justify-center z-50">
       <div
         className="relative w-[90%] lg:w-[50%] h-auto max-h-[80vh] bg-white p-5 rounded-md overflow-auto"
         style={{ boxShadow: "0 0 4px 1px #c3bcbc" }}
       >
         <div
           onClick={() => {
             setOpen(false)}}
           className="flex justify-between text-3xl mb-4"
         >
           <h1 className="font-bold text-3xl">Query Details</h1>
           <div className="hover:text-red-500 cursor-pointer">
             <IoCloseCircleOutline />
           </div>
         </div>
     
         { 
          details.map((detail, index) => (
            <div className="text-lg" key={index}>
            <div className="mb-1 flex items-center gap-x-2">
              <span className="font-semibold">Name:</span>
              <span>{detail?.name}</span>
            </div>
            <div className="mb-1 flex items-center gap-x-2">
              <span className="font-semibold">Mobile:</span>
              <span>{detail?.mobile}</span>
            </div>
            <div className="mb-1 flex items-center gap-x-2">
              <span className="font-semibold">Purpose:</span>
              <span>{detail?.purpose || detail?.purpose}</span>
            </div>
            <div className="mb-1 flex items-center gap-x-2">
              <span className="font-semibold">Description:</span>
              <span>{detail?.description}</span>
            </div>
            <div className="mb-1 flex items-center gap-x-2">
              <span className="font-semibold">Assigned To:</span>
              <span className='font-bold'>{detail?.assigned.name}</span>
            </div>
            <div className="mb-1 flex items-center gap-x-2">
              <span className="font-semibold">Status:</span>
              <span className='bg-green-200 text-xs p-1 uppercase rounded-md text-green-500'>{detail?.status}</span>
            </div>
          </div>
          ))
         }
       </div>
     </div>     
      )}
    <div className='p-2  flex items-center justify-normal'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full rounded-md ">
          <h1 className="">Contact List</h1>
        </div>
    </div>
      <div className="w-full p-8">
      <BasicTable columns={columns} data={contactDetails} />
      </div>
    </div>
  )
}

export default ListProduct
