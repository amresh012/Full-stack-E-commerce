import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import moment from "moment";

const BlogView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [image, setImage] = useState(location?.state?.image || '');
  const [content, setContent] = useState(location?.state?.content || '');
  const [title, setTitle] = useState(location?.state?.title || '');
  const [createdAt, setCreatedAt] = useState(location?.state?.createdAt || '');
  const [author, setAuthor] = useState(location?.state?.author || 'Mayank Jha');

  return (
    <>
      <div className="blogview-header min-h-[50vh] bg-black/20 flex items-center w-full p-4">
        <div className="lg:h-32 flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
          <h1>KFS Fitness Blogs</h1>
          <p className=" capitalize lg:text-base text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
            magnam accusamus sapiente quae delectus!
          </p>
        </div>
      </div>

      <h1 className="mt-16 uppercase text-center text-[#0a2440] text-4xl font-bold">
        Blog
      </h1>
      <div className="mx-auto mt-2 rounded-md h-[6px] w-[70px] bg-[#0a2440]"></div>

      <div className="my-10 w-full md:w-[44rem] mx-auto">
        <img
          loading="lazy"
          src={image}
          className="w-full object-cover h-[15rem] sm:h-[25rem]"
        />
        <div>
          <p className="mt-5 mb-3 text-xl">
            <span className="font-bold text-[#0a2440]">By Mayank Jha</span>
            <span className="mx-4 text-[#ababab] font-medium">|</span>
            <span className="font-medium text-[#ababab]">
              {moment(createdAt).format("DD-MM-yyyy")}
            </span>
          </p>
          <p className="text-4xl font-bold text-[#0a2440] my-2">{title}</p>
          <p className="text-lg font-light">
            {content}
          </p>
          <div>
            <button onClick={() => navigate(-1)} className="mt-5 hover:bg-white text-lg px-14 py-3 rounded-sm bg-[#144170] text-white duration-500 ease-in-out hover:text-[#0a2440]">
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogView;
