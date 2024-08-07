import React, { useState } from 'react'
import Dropdown from '../components/reusablesUI/Dropdown'
import ProductPage from "../pages/Product/ProductPage"
import Bestsellers from './Bestsellers'
import {gym_equipment,gym_product_pricing_inr} from "../constant"


const CommercialGym = () => {
  
   let Products = 44
    const options = 
    [
        {
            id:0,
            value:"Featured"
        },
        {
            id:1,
            value:"Best Selling"
        },
        {
            id:2,
            value:"Alphabatically, A-Z"
        },
        {
            id:3,
            value:"Alphabatically, A-Z"
        },
        {
            id:4,
            value:"Price, Low-High"
        },
        {
            id:5,
            value:"Price, High-Low"
        },
        {
            id:6,
            value:"Date, Old-New"
        },
        {
            id:7,
            value:"Date, New-Old"
        }
    ] 

    const Availibility= [
        {
            id:0,
            value:"In Stock"
        },
        {
            id:0,
            value:"Out Of Stock"
        }
    ]


  return (
   <>
    <div className="">
        <div className=" flex justify-around p-12 border-b-2">
            {/*  */}
            <div className="flex items-center gap-12  justify-around">
                <h1 className='text-2xl'>Filter:</h1>
               <div className="">
               <h1 className=''>Availibility</h1>
               <Dropdown dataArray={Availibility}/>
               </div>
               <div className="">
                <h1>Price:</h1>
                <Dropdown dataArray={gym_product_pricing_inr} />
               </div>
            </div>
            {/*  */}
            <div className="">
                <h1>Sort by:</h1>
                <Dropdown dataArray={options}/>
            </div>
            <div className="flex items-center gap-2 border-2 px-4 bg-black text-white sdadow-md border-black">
                <p>Products</p>
                <span>{Products}</span>
            </div>
        </div>
        <div className="pt-12 flex flex-col gap-24">
           {
            gym_equipment.map((title , i)=>(
                <div key={i} className=" flex flex-col  items-start justify-normal">
                    <div className="border-l-8 border-blue-500  ml-28 px-2">
                   <h1 className='text-xl font-bold hover:pl-4 duration-300'>{title}</h1>
                </div>
                    <Bestsellers/>
                </div>
            ))
        }
        
        </div>
    </div>
   </>
  )
}

export default CommercialGym
