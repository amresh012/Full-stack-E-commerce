import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl';

const ListProduct = () => {
  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
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
      header: "Action",
    },
  ];

  // contact data fetch
  const [contact , setContact] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  
  useEffect(() => {
    const FetchContact = async () => {
      let response = await fetch(`${base_url}contact`);
      let data = await response.json();
      setContact(data);
      setIsLoading(false);
    };
    FetchContact();
    
  }, [])

  return (
    <div className=' rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around lg:mx-24 p-6'>
       <div className="flex justify-between px-12 items-center w-full p-12">
        <h1 className='text-3xl'>List Of Contacts from website</h1>
        <div className="flex items-center bg-blue-500">
            <input type="search" className='h-10 w-60  focus:shadow-md border-2 outline-none px-2' />
            <button className="p-2 text-white">Search</button>
        </div>
       </div>
      <div className="w-full">
      <BasicTable columns={columns} data={contact} />
      </div>
    </div>
  )
}

export default ListProduct
