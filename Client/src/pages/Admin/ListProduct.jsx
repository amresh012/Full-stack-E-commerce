import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl'
import { FaAddressCard, FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { List } from '@mui/material'

const ListProduct = () => {
  const [product , setProduct] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  
  useEffect(() => {
    const FetchProduct = async () => {
      let response = await fetch(`${base_url}product`);
      let data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    FetchProduct();
    console.log(product)
    
  }, [])

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.original._id;
        return <span>{id.slice(0, 4)}</span>;
      },
    },
    {
      header: "Image",
      accessorKey: "image",
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
      cell:()=> <List sx={{display:"flex" , alignItems:"center", gap:4 , justifyContent:"center" , cursor:"pointer"}}>
       <div className="bg-red-200 p-2 rounded-md hover:shadow-md">
       <FaTrash className='text-red-500'/>
       </div>
       <div className="bg-blue-200 p-2 rounded-md hover:shadow-md">
       <FaEye className='text-blue-500'/>
       </div>
       <div className="bg-black/20 p-2 rounded-md hover:shadow-md">
       <FaPen className='text-black'/>
       </div>
      </List >
    },
  ];
  return (
    <>
     <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="">Contact List</h1>
        </div>
    </div>
    <div className="w-full p-8">
        <BasicTable  columns={columns}  data={product}/>
       </div>
    </>
  )
}

export default ListProduct
