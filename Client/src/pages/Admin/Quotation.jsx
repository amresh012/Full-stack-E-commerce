import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import { base_url } from '../../Utils/baseUrl';
import { List } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { config } from '../../Utils/axiosConfig';
import RefreshButton from '../../components/reusablesUI/RefreshButton';
import AnimatedDeleteButton from "../../components/Ui/AnimatedDeleteButton"




// coloumns


const Quotation = () => {
    const [data, setData] = useState([]);
    const [isLoading  ,setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [remarks, setRemarks] = useState({});
  const [editMode, setEditMode] = useState({});

  const columns =  [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{(+id)+1}</span>;
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
      header: "Product ",
      accessorKey: "product",
      cell:({row})=>{
        return (
         <span>{row?.original?.product.substring(0,20)}</span>
        )
      }
    },
    {
      header: "Remarks",
      accessorKey: "",
      cell: ({ row }) => {
          const rowId = row.original._id;
          const name = row.original.name
          const isEditing = editMode[rowId]; // Check if in edit mode for this row

          return (
              <div className='flex items-center'>
                  {isEditing ? (
                      <>
                          <input
                              type="text"
                              value={remarks[rowId]} // Set the value from the remarks state
                              onChange={(e) => handleRemarkChange(rowId, e.target.value)} // Update the remark on change
                              className='h-10 border placeholder:px-2 px-2'
                              placeholder='Enter remarks'
                          />
                          <button
                              onClick={() => handleRemarkUpdate(rowId,name)} // Call update function
                              className='text-white uppercase p-2 bg-[#0a2444] ml-2'
                          >
                              Save
                          </button>
                      </>
                  ) : (
                      <div className='flex items-center min-w-[16rem] justify-between'>
                          <span className=''>{remarks[rowId] || 'No remarks'}</span>
                          <button
                              onClick={() => handleEdit(rowId)} // Enable edit mode
                              className='text-white uppercase p-2 bg-[#0a2444] ml-2'
                          >
                              Edit
                          </button>
                      </div>
                  )}
              </div>
          );
      }
  },
    {
      header: "Query ",
      accessorKey: "desc",
    },
    {
      header: "Action",
      cell:({row})=>
        <List className='flex items-center gap-2 justify-center cursor-pointer'>
         <div onClick={()=>deleteQuote(row.original._id)} className="">
          <AnimatedDeleteButton/>
         </div>
        </List>
    },
  ];

  const handleRemarkChange = (id, value) => {
    setRemarks({[id]:value})
    // setRemarks((prevRemarks) => ({
    //     ...prevRemarks,
    //     [id]:value, 
    // }));
};
const handleRemarkUpdate = (id,name) => {
  setEditMode((prev) => ({ ...prev, [id]: false })); 
  const updatedRemark = remarks[id];
  if (updatedRemark) {
      toast.success(`Remark updated for${name}`);
  } else {
      toast.error("Please enter a remark before updating.");
  }
};

//  edit mode
const handleEdit = (id) => {
  setEditMode((prev) => ({
      ...prev,
      [id]: true, 
  }));
};

// deleteQuote
  const deleteQuote = async (id) => {
    try {
      alert("Are You Sure You Want to Delete this Quotation")
      const response = await fetch(`${base_url}quot/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
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


  useEffect(() => {
    const FetchContact = async () => {
      let response = await fetch(`${base_url}quot`);
      let data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    FetchContact();
    // 
  }, [reload])



  return (
    <>
    <Toaster/>
    <div className=" p-2 flex items-center justify-normal rounded-md">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Quotations</h1>
        </div>
      </div>
    <div className='pl-4'>
      <RefreshButton/>
      <BasicTable columns={columns} data={data || []}/>
    </div>
    </>
  )
}

export default Quotation
