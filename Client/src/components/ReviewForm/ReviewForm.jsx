import { Rating} from '@mui/material'
import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import {useFormik} from "formik"
import {config} from "../../Utils/axiosConfig"
import axios from "axios"
import {base_url}from "../../Utils/baseUrl"
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
const ReviewForm = ({ productId, userId }) => {
  console.log("product", productId);
  console.log("uesrid", userId);
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      review: "",
      rating: 0,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const datatosend = { ...values, userId };
        console.log(datatosend);
        const response = await axios.post(
          `${base_url}reviews/${productId}`,
          datatosend,
          config
        );
        console.log(response);
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          toast.success(response.data.success);
          setFieldValue("title", "");
          setFieldValue("reting", 0);
          setFieldValue("desc", "");
        }
      } catch (error) {
        //
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="lg:p-12">
        <form
          onSubmit={handleSubmit}
          className="h-auto lg:p-12 p-4 space-y-8 border-2"
        >
          <div className="Rating flex gap-2  py-4 flex-col text-3xl font-bold">
            <label htmlFor="">Rating</label>
            <Rating
              value={values.rating}
              id="rating"
              onChange={(e, newValue) => setFieldValue("rating", newValue)}
              defaultValue={0}
              precision={0.5}
            />
          </div>
          <div className="review-title">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Review Title</label>
              <input
                value={values.title}
                onChange={handleChange}
                type="text"
                id="title"
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter your full name"
              />
            </div>
          </div>
          <div className="review-description w-full  flex flex-col">
            <label htmlFor="">Description</label>
            <div className="input-1 w-full flex-col flex">
              <textarea
                type="text"
                id="review"
                value={values.review}
                onChange={handleChange}
                className=" h-24 border-2 rounded-md outline-none p-2 Font-oswald "
              />
            </div>
          </div>
          <div className="flex gap-12  w-full items-center justify-center">
            <button className="flex gap-2 bg-black border-black text-white  items-center font-bold border-2 p-2">
              <FaTelegramPlane />
              <button type="submit">Submit Review</button>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm
