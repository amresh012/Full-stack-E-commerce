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
    // console.log(product)
    
  }, [])

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
    },
    {
      header: "Product Name",
      accessorKey: "name",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Action",
      cell:()=> <List sx={{display:"flex" , alignItems:"center", gap:4 , justifyContent:"center" , cursor:"pointer"}}>
       <FaTrash className='text-red-500'/>
       <FaEye className='text-blue-500'/>
       <FaPen/>
      </List >
    },
  ];
  return (
    <div className='flex flex-col justify-around gap-12 items-center border-2 shadow-md h-auto'>
       <div className="flex justify-between px-12 items-center w-full p-12">
        <h1 className='text-3xl'>Products List</h1>
        <div className="bg-black">
            <input type="search" className='h-10 w-60  focus:shadow-md  outline-none px-2' />
            <button className="p-2 text-white">Search</button>
        </div>
       </div>
       <div className="w-full">
        <BasicTable  columns={columns}  data={product}/>
       </div>
    </div>
  )
}

export default ListProduct
