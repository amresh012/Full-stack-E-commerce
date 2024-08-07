import { Input, Skeleton, Slider } from '@mui/material'
import React, { useState } from 'react'
import Bestsellers from '../Bestsellers'
import Loader from '../../components/reusablesUI/Loader'
import {gym_equipment,gym_product_pricing_inr} from "../../constant"
const Product = () => {
   
 
  return (
   <>
    <div className="main-wrapper p-4 h-auto flex  items-center justify-center ">
     
      {/* bottom component */}
     <div className="product_filter-wrapper flex ">
      {/* filter */}
     <div className="fillter_wrapper space-y-6 w-[25rem] shadow-md overflow-y-auto ">
      {/* filter-1 */}
      <div className="h-12  flex items-center justify-center text-3xl ">
        <h1 className='bg-blue-500 w-full  text-white uppercase p-2'>Filter</h1>
      </div>
      <div className="p-2 space-y-2 border-b-2 ">
      <h1 className='font-bold'>Category</h1>
      <div className="px-2 flex flex-col gap-2 ">
      <Input placeholder='enter product range'/>
      </div>
      <div className="h-[30vh] overflow-y-auto ">
       {
        gym_equipment.map((item , index)=>(
          <div className="flex gap-2 p-2 hover:bg-blue-300 " key={index}>
            <input type="checkbox" />
            <p>{item}</p>
          </div>
        ))
       }
      </div>
      </div>
      {/* filter-2 */}
      <div className="p-2 space-y-2 ">
      <h1 className='font-bold'>Price</h1>
      <div className="px-2 flex flex-col gap-2">
      <Slider/>
      <Input placeholder='enter price range'/>
      </div>
      <div className="h-[30vh] overflow-y-scroll ">
       {
        gym_product_pricing_inr.map((item , index)=>(
          <div className="flex gap-2 p-2 hover:bg-blue-300" key={index}>
            <input type="checkbox" />
            <p>{item}</p>
          </div>
        ))
       }
      </div>
      </div>
     </div>
     {/* filter end */}



     {/* product list all */}
     <div className="product_list_all w-[70vw] ">
      {/* product header */}
      <div className="h-24 flex justify-around items-center bg-gray-200">
        <p className='text-2xl font-bold'>Product List (44)</p>
        <div className="flex items-center gap-2">
          <span className=''>Sort by:</span>
          <select className='outline-none p-2 rounded-md border-2'>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
            <option value="Alphabetical A-Z">Alphabetical A-Z</option>
            <option value="Alphabetical Z-A">Alphabetical Z-A</option>
          </select>
        </div>
      </div>
      {/* product list */}
      <div className="product-list_container">
        <Bestsellers/>
      </div>
     </div>
     </div>
    </div>
   </>
  )
}

export default Product
