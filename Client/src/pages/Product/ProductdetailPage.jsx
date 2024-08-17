import React, { useEffect, useState } from 'react'
import {useParams}from "react-router-dom"
import {Spin,Spin1,Spin2 } from "../../assets/images"
import { Avatar, Rating } from '@mui/material'
import {FaCheckCircle , FaGlobe, FaLock } from 'react-icons/fa'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import Ratingdata from "../../MOCK_DATA (6).json"
import {toast, Toaster}from "react-hot-toast"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

 const  ProductdetailPage = () => { 
   const {id} = useParams()
   let isStock = false
   const [quantity, setQuantity] = useState(1)
   const [reviewvisible , setReviewVisible] = useState(false)
   const [endrating, setEndRating] = useState(4)
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [price, setPrice] = useState(5220)
   const collection = [
    { src: Spin, caption: "Caption eleven" },
    { src: Spin1, caption: "Caption twelve" },
    { src: Spin2, caption: "Caption thirteen" },
    { src: Spin2, caption: "Caption thirteen" },
    { src: Spin1, caption: "Caption thirteen" },
    { src: Spin, caption: "Caption thirteen" }
  ];

  const handleLoadReviews  = ()=>{
    if(localStorage.getItem("token")){
      setIsLoggedIn(true)
    }
    isLoggedIn ? setEndRating(endrating+2) : toast.error("Your Are Not Logged In")
  }
  
  const handleReviewView= ()=>{
    if(localStorage.getItem("token")){
      setIsLoggedIn(true)
    }
    isLoggedIn ? setReviewVisible(!reviewvisible) : toast.error("Your Are Not Logged In")
  }

   const handleIncr = ()=>{
    quantity < 5 &&  (setQuantity(quantity+1),setPrice(price + 5220))
   }
   const handleDecr = ()=>{
    quantity > 0 &&  price !==5220 && (setQuantity(quantity-1),setPrice(price - 5220))
   }
  
  return (
    <>
    <Toaster/>
    <div className="">
    <div className=" p-12  flex gap-12 ">
     {/* image-container */}
    <div className="w-full">
    <Carousel autoplay={true}>
       {
        collection.map((item, index) => (
          <img src={item.src} alt="" key={index} />
        ))
       }
       
      </Carousel>
    </div>
     {/* image-container-end */}
     <div className="details-container flex flex-col ">
      <h1 className='font-bold space-x-12 bg-gray-200 w-fit p-2 rounded-md mb-4'>Home / <span>Collectiom</span></h1>
      <Rating name="half-rating" value={4.9} defaultValue={2.5} precision={0.5} />
      <p className="product-name font-bold text-2xl">Revo 220 Group Cycling Bike</p>
      <span>Variant : SKP: SF-FOO3-C</span>
      <div className="price space-x-4">
        <span className="text-2xl font-bold line-through text-red-500">Rs 5,500.00</span>
        <span className="text-2xl font-bold">Rs{price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
      </div>
      {/* <div className="dimensions flex flex-col gap-2">
        <h1 className='font-bold text-xl'>Net-Weights</h1>
        <div className="flex gap-4 ">
        {
          [...Array(5)].map((_,i)=>(
            <div className="border-2 cursor-pointer hover:bg-black hover:text-white duration-150  w-fit p-2 border-black" key={i}>
              <span>{
               i *5 >0 ?(i+1)*5:`0${(i+1)*5}` 
              }</span>
            </div>
          ))
        }
        </div>
      </div> */}
      <div className="description mt-4 leading-8 tracking-wider ">
        <p className="Font-oswald">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro eum libero quisquam facere iusto? Eaque, nemo possimus alias saepe, aut sequi officia aliquid asperiores eius culpa consectetur repellendus expedita aperiam.</p>
      </div>
      <div className="pt-2 text-gray-500 font-bold italic">
        <p>UPI & Cards Accepted , Online approvalsin 2 minute</p>
      </div>
      <div className="qua space-y-4  mt-2">
        <h1 className='font-bold  text-xl'>Quantity</h1>
        <div className="flex">
          <button className='p-2 bg-black text-white active:scale-95' onClick={handleIncr}>+</button>
           <p className='p-2 px- font-bold bg-white'>{quantity}</p>
          <button  className='p-2 bg-black text-white active:scale-95' onClick={handleDecr}>-</button>
        </div>
      </div>
      <div className="action-buttons flex flex-col gap-4 mt-12 p-12">
        <button className="border-2 px-12 py-3 border-black  active:scale-95 duration-300 bg-gray-100">Add to Cart</button>
        <button className="px-12 py-3 bg-black text-white active:scale-95 duration-300">Buy it Now</button>
      </div>
      <div className="shipping-info ">
        <p className=''><span className='text-red-500 animate-pulse'>**</span> Tax included<sapn className="underline px-1">Shipping</sapn>calculated at checkOut
        </p>
      </div>
      <div className="availibility">
        {
          quantity >0 ? 
          <p className='flex items-center gap-2 text-xl text-green-500 font-medium'><div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>In Stock, Ready to Ship</p>
          :
          <p className='flex items-center gap-2 text-xl text-red-500 font-medium'><div className='w-2 h-2 rounded-full  bg-red-500 animate-pulse'></div>Out Of Stock</p>
        }
      </div>
      {/* shipping features */}
      <div className="shipping-features flex justify-around items-center p-2 border-b-2 border-t-2 m-4 border-black">
        <div className="flex gap-2 flex-col items-center p-4">
          <FaGlobe  size={30}/>
          <p>Pan India Shipping</p>
        </div>
        <div className="flex  flex-col items-center p-4">
          <FaGlobe size={30}/>
          <p>Highly Durable</p>
        </div>
        <div className="flex  flex-col items-center p-4">
          <FaLock size={30}/>
          <p>Secure Payment</p>
        </div>
      </div>
     </div>
    </div>
    </div>
    {/* ********************************************************************************************************************* */}
    {/* customer reviews */}
    <div className="">
      <div className="heading px-4 p-2 font-bold text-3xl">Customer Reviews</div>
      <div className="border-b-2 py-4 px-2 mx-4">
        <div className="left-content  flex justify-between px-12  items-center">
          <div className=" text-xl font-bold">
            <p className='flex items-center gap-2'>4.9 <Rating name="half-rating" value={3.5} defaultValue={4.5} precision={0.5} /></p>

          <p className='font-thin text-sm'>Based on 12 reviews</p>
          </div>
          <div className="rightcontent border-2 p-2 hover:bg-black hover:text-white" onClick={handleReviewView}>
          <button>Write a Review</button>
        </div>
        </div>
      </div>
      {
        reviewvisible && <div className="">
        <ReviewForm/>
        </div>
      }
      <div className="rating-container  ">
        <div className="reviews flex flex-wrap   justify-center">
          {
            Ratingdata.slice(0,endrating).map((review)=>{
              return(
                <div className="each-review w-1/2 p-12 ">
                  <div className="header flex justify-between   items-start">
                    <div className="left-side-header flex items-start justify-start gap-2" >
                    <Avatar sx={{textTransform:"uppercase",bgcolor:"black",width:44, height:44}}>{review.username.slice(0,2)}</Avatar>
                    <div className="flex items-start ">
                      <div className="text-base font-bold">
                      <p className="name text-[18px] ">{review.username}</p>
                      <Rating  className='' name="size-small" value={review.rating} defaultValue={review.rating} precision={0.5} />
                      </div>
                      <span className='pt-1'>
                        {
                          review['user-type'] == "Verified User" ?
                           <div className="flex items-center gap-1 text-xs">
                            <FaCheckCircle  size={15} className='text-blue-500'/>
                            <p>{review['user-type']}</p>
                          </div>
                          :
                           <p className='text-xs text-gray-500'>{review['user-type']}</p>
                        }
                        </span>
                    </div>
                    </div>
                    <div className="date text-xs text-zinc-600">
                      <p>{review['review-date']}</p>
                    </div>
                  </div>
                   <div className="body">
                     <h1 className='font-bold text-xl'>{review.review_title}</h1>
                     <p>{review.review_desc}</p>
                   </div>
                </div>
              )
            })  

          }
        </div>
      </div>
      <div 
           onClick={handleLoadReviews}
           className="flex text-white active:scale-95 hover:shadow-md duration-300  items-center justify-center m-12 bg-black/50 p-2 w-fit">
           <button>Load More Reviews</button>
           </div>
    </div>
    </>
  )
}


export default ProductdetailPage
