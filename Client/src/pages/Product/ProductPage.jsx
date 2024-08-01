import { Skeleton } from '@mui/material'
import React, { useState } from 'react'
import Bestsellers from '../Bestsellers'

const Product = () => {
  
  const [data , setData] = useState(true)
  


  return (
    <div className='flex items-start justify-start '>
      <div className="flex flex-col justify-start gap-2 items-start pt-12 ">
      <div className="border-l-8 border-blue-500  ml-28 px-2">
  <h1 className='text-[3rem] font-bold'>Explore Our Range Of Products</h1>
  </div>
      <div className="flex  justify-evenly w-full items-start gap-5 flex-wrap m overflow-y-scroll">
      { data ?
      <Bestsellers/>
       :
        <div className="flex flex-col flex-wrap items-center justify-around gap-2 border-2 p-2 shadow-md hover:scale-110 duration-300">
            <Skeleton variant="rectangular" width={310} height={160} />
            <Skeleton variant="rounded" width={310} height={100} />
            <Skeleton variant="rounded" width={190} height={40} />
          </div>
      }
      </div>
      </div>
    </div>
  )
}

export default Product
