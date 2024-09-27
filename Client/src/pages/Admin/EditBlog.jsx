import React, { useRef, useEffect, useState } from "react";
import { base_url } from "../../Utils/baseUrl";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { config } from "../../Utils/axiosConfig";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const imageRef = useRef();
  const { id } = useParams();


  // TODO -> HANDLE IMAGE SIZE TOO LARGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUpdating(true);
      let imgResponse;

      if (imageRef.current.files.length > 0) {
        const formData = new FormData();
        formData.append("file", imageRef.current.files[0]);
  
        imgResponse = await axios.post("https://images.deepmart.shop/upload", formData);
      }

      if(imgResponse === undefined && imageRef.current.files.length > 0){
        throw new Error("Something went wrong.");
      }
      if(imgResponse?.data?.error){
        throw new Error(imgResponse?.data?.error);
      }

      const response = await axios.post(
        base_url + "blog/update",
        {
          _id: id,
          title,
          content,
          image: imgResponse?.data ? imgResponse.data[0] : undefined,
        },
        config
      );

      if(response.data.success){
          toast.success(response.data.message);
          return;
      }
      throw new Error(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Something went wrong');
    }
    finally{
      setIsUpdating(false);
    }
  };

  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`${base_url}blog/${id}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <>
        <Toaster />
      <div className="  flex items-center justify-normal  rounded-md p-4">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Edit Blog</h1>
        </div>
      </div>
      <div className="border-2 shadow-md flex items-center justify-normal m-4 rounded-md p-4">
        <form onSubmit={handleSubmit} className="h-full w-full space-y-2">
          <div className="title w-full space-y-2">
            <h1 className="text-xl font-bold uppercase">Blog Title</h1>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border-2 rounded-md"
              placeholder="Enter Blog Title"
            />
          </div>
          <div className="description-editor w-full space-y-2">
            <div className="">
              <h1>Blog Desription</h1>
            </div>
            <textarea
              required
              className="w-full p-2 border-2 rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="title w-full space-y-2">
            <h1 className="text-xl font-bold uppercase">Blog Image</h1>
            <input
              className="w-full p-2 border-2 rounded-md"
              type="file"
              ref={imageRef}
              accept=".jpg, .png, .webp"
            />
          </div>

          <button
            disabled={isUpdating}
            className="w-full border-2 cursor-pointer  text-center border-[#0a2440] text-[#0a2440] px-12 py-2 hover:text-white  duration-300 hover:bg-[#0a2440] disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed"
            type="submit"
          >
            {isUpdating ? 'Updating...' : 'Edit Blog'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
