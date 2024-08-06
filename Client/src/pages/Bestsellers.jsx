import React, { useEffect, useState } from 'react'
import { bestsellers } from '../constant'
import { Rating } from '@mui/material'
// import {useSelector, useDispatch} from "react-redux"
import {base_url} from "../Utils/baseUrl"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from ".././components/reusablesUI/Loader"

const Bestsellers = ({classname}) => {
  const [product , setProduct] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  
  useEffect(() => {
    const FetchProduct = async () => {
      let response = await fetch(`${base_url}api/product`);
      let data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    FetchProduct();
    
    AOS.init();
  }, [])
  
  // console.log(product)
  return (
    <div className='flex flex-wrap justify-center items-center gap-4 w-screen overflow-clip'>
      {
        isLoading ?<Loader/>:
        product?.map((item)=>(
            <div data-aos="flip-left"
            className=" w-[25rem] flex flex-col items-start justify-start  py-12 relative hover:-translate-y-2 duration-300">
                <div className="img w-full flex items-center justify-center bg-gray-100 min-h-[12rem]">
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
