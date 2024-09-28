import React, { useRef, useState } from "react";
import { base_url } from "../../Utils/baseUrl";
import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../../Utils/axiosConfig";
// import Button from "../../components/Ui/Button";
const AdminBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(imageRef.current.files.length === 0){
      toast.error('Image not selected');
      return;
    }
    try {
      setIsAdding(true);
      const formData = new FormData();
      formData.append("file", imageRef.current.files[0]);

      const imgResponse = await axios.post("https://images.deepmart.shop/upload", formData);

      if(imgResponse?.data?.error){
        throw new Error(imgResponse.data.error);
      }

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
    finally{
      setIsAdding(false);
    }
  };
  // const generateBlog = async (topic) => {
  //   const response = await axios.post(`${base_url}blog/generate-blog-content`, { topic });
  //   setContent(response.data);
  // };


  return (
    <>
      <div className=" flex items-center justify-normal  rounded-md p-4">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Add Blog</h1>
        </div>
      </div>
      <div className="border-2 shadow-md flex items-center justify-normal m-4 rounded-md p-4">
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
              className="w-full p-2 border-2 rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write Blog Description or Generate with AI"
            ></textarea>
            {/* <Button onClick={() => generateBlog("fdfvsgvdfbzdfbzdfgd")} text="Generate With AI"/> */}
          </div>


          <div className="title w-full space-y-2">
            <h1 className="text-xl font-bold uppercase">Blog Image</h1>
            <input className="w-full p-2 border-2 rounded-md" required type="file" ref={imageRef} accept=".jpg, .png, .webp" />
          </div>

            <button disabled={isAdding} className="w-full border-2 cursor-pointer  text-center border-[#0a2440] text-[#0a2440] px-12 py-2 hover:text-white  duration-300 hover:bg-[#0a2440] disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed" type="submit">{isAdding ? 
            'Adding...' : 'Add Blog'}</button>

        </form>
      </div>
    </>
  );
};

export default AdminBlog;