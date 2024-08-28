import React, { useRef, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { base_url } from "../../Utils/baseUrl";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../../Utils/axiosConfig";
const AdminBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const imageRef = useRef();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if(imageRef.current.files.length === 0){
      toast.error('Image not selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", imageRef.current.files[0]);

      const imgResponse = await axios.post('http://127.0.0.1:8032/upload', formData);

      const response = await axios.post(
        base_url + "blog/add",
        {
          title,
          content,
          image: imgResponse.data[0],
        },
        config
      );
      imageRef.current.files = [];
      setTitle('');
      setContent('');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Something went wrong');
    }
  };


  return (
    <>
      <div className="border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Add Blogs</h1>
        </div>
      </div>
      <div className="border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4">
        <form onSubmit={handleSubmit} className="h-full w-full space-y-2">
          <div className="title w-full space-y-2">
            <h1 className="text-xl font-bold uppercase">Blog Title</h1>
            <input required
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
            <input className="w-full p-2 border-2 rounded-md" required type="file" ref={imageRef} accept=".jpg, .png, .webp" />
          </div>

            <button className="w-full border-2 cursor-pointer  text-center border-[#0a2440] text-[#0a2440] px-12 py-2 hover:text-white  duration-300 hover:bg-[#0a2440]" type="submit">Add Blog</button>

        </form>
      </div>
    </>
  );
};

export default AdminBlog;