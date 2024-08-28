import { Rating, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaCamera, FaTelegramPlane } from 'react-icons/fa'

const ReviewForm = () => {
    const [title, setTitle] = useState("")
    const  [desc, setDesc] = useState("")
    const [rating, setRating] = useState()
    const [recomand , setRecomand] = useState(0)
    
   const handleReviewSubmit =(e)=>{
    e.preventDefault()
    const review = {
        title:title,
        desc:desc,
        rating:rating,
        recomand:recomand
        }
     
    useEffect(()=>{
        const sendReview = async () => {
            try {
                const response = await fetch('http://localhost:3001/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(review),
                        })
                        const data = await response.json()
                        // console.log(data)
                        }
                        catch(error){
                            // console.error(error)
                        }

   }})

   }

  return (
    <div className='lg:p-12'>
      <form onSubmit={handleReviewSubmit} className='h-auto lg:p-12 p-4 space-y-8 border-2'>
        <div className="Rating flex gap-2  py-4 flex-col text-3xl font-bold">
            <label htmlFor="">Rating</label>
            <Rating
             value={rating}
             onChange={(event, newValue) => {
                setRating(newValue);
             }}
             name="half-rating" 
             defaultValue={0} precision={0.5} />
        </div>
        <div className="review-title">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Review Title</label>
                <input
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 type="text"
                 id="corporateDiscount"
                 className='h-14 border-2 rounded-md outline-none px-2 ' placeholder='enter your full name' />
            </div>
        </div>
        <div className="review-description w-full  flex flex-col">
            <label htmlFor="">Description</label>
            <div className="input-1 w-full flex-col flex">
                <textarea
                 type="text"
                 value={desc}
                 onChange={(e)=>setDesc(e.target.value)}
                 id="corporateDiscount"
                 className=' h-24 border-2 rounded-md outline-none p-2 Font-oswald ' />
            </div>
           
        </div>
        <div className="recomand p-4">
            <label htmlFor="" className='text-xl'>Do You Recommand this Product ?</label>
            <div className="flex items-center gap-2 uppercase justify-normal">
            <input 
                type="radio"
                 name="ques"
                 checked={recomand === 1 && true }
                 onChange={(e)=>{
                    return  e.target.checked && setRecomand(1)
                 }}/>
                <span>yes</span>
            </div>
            <div className="flex items-center gap-2 uppercase justify-normal">
                <input 
                type="radio"
                 name="ques"
                 checked={recomand === 0 && false}
                 onChange={(e)=>{
                    return  e.target.checked && setRecomand(0)
                 }}
                  />
                <span>No</span>
            </div>
        </div>
        <div className="flex gap-12  w-full items-center justify-center">
            <div className='flex gap-2  items-center font-bold border-2 p-2 bg-black border-black text-white    '>
                <FaCamera/>
                <span>Add Photo</span>
            </div>
            <button className='flex gap-2 bg-black border-black text-white  items-center font-bold border-2 p-2'>
                <FaTelegramPlane/>
                <button type="submit">Submit Review</button>
            </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
