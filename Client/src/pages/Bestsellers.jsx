import React from 'react'
import { bestsellers } from '../constant'
import { Rating } from '@mui/material'
import {useSelector, useDispatch} from "react-redux"
const Bestsellers = ({classname}) => {
  return (
    <div className='flex flex-wrap justify-start items-center gap-4 pl-24'>
      {
        bestsellers.map((item)=>(
            <div className=" w-[25rem] flex flex-col items-start justify-start p-4 relative hover:-translate-y-2 duration-300">
                <div className="img w-full flex items-center justify-center bg-gray-100 ">
                    <img src={item.ImgUrl} alt={item.name}  />
                    <div className="absolute top-0 left-0 bg-red-500 px-12">
                    </div>
                </div>
                <div className="detail flex flex-col  p-2 bg-[#1f1f21] w-full text-white ">
                    <h1 className='text-2xl font-bold hover:underline Font-oswald'>{item.title}</h1>
                    <div className="flex gap-1 items-center">
                     <div className="flex gap-1 text-white">
                     <Rating name="read-only" value={item.rating} readOnly precision={0.5}  />
                     </div>
                        <span className=''>{item.rating}</span>
                    </div>
                    <p  className='flex gap-4 '>
                        <span className='text-red-400 line-through'>Rs.{item.salePrice}</span>
                        <span className='text-red-400'>Rs.{item.OfferPrice}</span>
                         </p>
                    <span>{item.category}</span>
                    <div className="add-to-cart flex items-center justify-center m-4 p-4 border-2 hover:-translate-y-2 duration-300">
                    <button>Add To Cart</button>
                </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Bestsellers
