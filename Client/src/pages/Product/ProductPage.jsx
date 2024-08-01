import { Skeleton } from '@mui/material'
import React, { useState } from 'react'

const Product = () => {
  
  const [data , setData] = useState([])
  


  return (
    <div className='flex items-start justify-start '>
      <div className="flex justify-start gap-2 items-start pt-12">
      <div className="flex ml-4 ">
      <Skeleton variant="rectangular" width={410} height={860} />
      </div>
      <div className="flex  justify-evenly  items-start gap-5 p-12 flex-wrap max-h-[80vh] overflow-y-scroll">
      {
        [...Array(12)].map((item) => (
          <div className="flex flex-col flex-wrap items-center justify-around gap-2 border-2 p-2 shadow-md hover:scale-110 duration-300">
            <Skeleton variant="rectangular" width={310} height={160} />
            <Skeleton variant="rounded" width={310} height={100} />
            <Skeleton variant="rounded" width={190} height={40} />
          </div>

        ))
      }
      </div>
      </div>
    </div>
  )
}

export default Product
