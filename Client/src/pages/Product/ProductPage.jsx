import { Skeleton } from '@mui/material'
import React, { useState } from 'react'
import Bestsellers from '../Bestsellers'
import Loader from '../../components/reusablesUI/Loader'

const Product = () => {
  
  
 
  return (
    <div className='flex items-start justify-start h-screen'>
      <div className="flex flex-col justify-start gap-2 items-start pt-12 ">
      <div className="border-l-8 border-blue-500  ml-28 px-2">
  <h1 className='text-[3rem] font-bold'>Explore Our Range Of Products</h1>
  </div>
      <div className="flex  items-center justify-center ">
      
      <Bestsellers/>
   
      </div>
      </div>
    </div>
  )
}

export default Product
