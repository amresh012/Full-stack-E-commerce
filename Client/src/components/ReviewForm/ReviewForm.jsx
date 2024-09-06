import { Rating, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaCamera, FaTelegramPlane } from 'react-icons/fa'
import {useFormik} from "formik"
import {config} from "../../Utils/axiosConfig"
import axios from "axios"
import {base_url}from "../../Utils/baseUrl"
import { useParams } from 'react-router-dom'
const ReviewForm = () => {
    const {id} = useParams()
   const {values , handleChange ,setFieldValue, handleSubmit} = useFormik({
    initialValues:{
        title: '',
        desc:"",
        rating: 0,
    },
    onSubmit: async (values, { setSubmitting }) => {
        try {
            const datatosend = {...values , id}
          const response = await axios.post(`${base_url}reviews`, datatosend , config);
          if (response.data.error) {
            throw new Error(response.data.error);
          } else {
            toast.success(response.data.success);
          }
        } catch (error) {
          // console.log(typeof(error.message))
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      },
   }) 

  return (
    <div className='lg:p-12'>
      <form onSubmit={handleSubmit} className='h-auto lg:p-12 p-4 space-y-8 border-2'>
        <div className="Rating flex gap-2  py-4 flex-col text-3xl font-bold">
            <label htmlFor="">Rating</label>
            <Rating
             value={values.rating}
             id="rating"
             onChange={(e ,newValue)=>setFieldValue("rating", newValue)}
             defaultValue={0} precision={0.5} />
        </div>
        <div className="review-title">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Review Title</label>
                <input
                 value={values.title}
                 onChange={handleChange}
                 type="text"
                 id="title"
                 className='h-14 border-2 rounded-md outline-none px-2 ' placeholder='enter your full name' />
            </div>
        </div>
        <div className="review-description w-full  flex flex-col">
            <label htmlFor="">Description</label>
            <div className="input-1 w-full flex-col flex">
                <textarea
                 type="text"
                 id="desc"
                 value={values.desc}
                 onChange={handleChange}
                 className=' h-24 border-2 rounded-md outline-none p-2 Font-oswald ' />
            </div>
           
        </div>
        <div className="flex gap-12  w-full items-center justify-center">
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
