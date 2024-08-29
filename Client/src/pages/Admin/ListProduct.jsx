import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl'
import { FaAddressCard, FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { List } from '@mui/material';
import {toast, Toaster} from 'react-hot-toast';
import {config} from '../../Utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
  const [product , setProduct] = useState([])
  const [isLoading  ,setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const deleteProduct = async (id)=>{
    try {
      const response = await fetch(`${base_url}product/${id}`, {
        method: "DELETE",
        ...config
      });
      const data = await response.json();
      if(data.error){
        toast.error(data.error);
        return;
      }
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
  
  useEffect(() => {
    const FetchProduct = async () => {
      let response = await fetch(`${base_url}product`);
      let data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    FetchProduct();
    // console.log(product)
    
  }, [reload])

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
      header: "Image",
      accessorKey: "images",
      cell:({row})=>{
        // console.log(row.original.images[0])
         return <img src={row.original.images[0]} alt="" className='h-12 w-12 object-cover'/>
      }
    },
    {
      header: "Product Name",
      accessorKey: "name",
    },
    {
      header: "Price / unit",
      accessorKey: "price",
    },
    // {
    //   header: "Discount",
    //   accessorKey: "corporate_discount",
    //   cell: ({ row }) => {
    //     const discount = row.original?.Individual_discount;
    //     console.log(discount)
    //     return <span>{discount}</span>;
    //   },
    // },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Action",
      cell:({row})=> <List sx={{display:"flex" , alignItems:"center", gap:4 , justifyContent:"center" , cursor:"pointer"}}>
       <div onClick={()=>deleteProduct(row.original._id)} className="bg-red-200 p-2 rounded-md hover:shadow-md">
       <FaTrash className='text-red-500'/>
       </div>
       <div className="bg-blue-200 p-2 rounded-md hover:shadow-md">
       <FaEye className='text-blue-500'/>
       </div>
       <div onClick={()=>navigate(`/admin/product-edit/${row.original._id}`)} className="bg-black/20 p-2 rounded-md hover:shadow-md">
       <FaPen className='text-black'/>
       </div>
      </List >
    },
  ];
  return (
    <>
    <Toaster />
     <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Product List</h1>
        </div>
    </div>
    <div className="w-full p-8">
        <BasicTable  columns={columns} data={product} />
       </div>
    </>
  )
}

export default ListProduct
