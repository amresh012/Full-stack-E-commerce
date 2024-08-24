import React from "react";
import img from "../../assets/about-1.jpg";

const BlogRecentCard = () => {
  return (
    <div className="flex w-full  md:w-[28rem] p-2  overflow-clip  ">
      <img loading="lazy" src={img} className="h-[inherit] rounded-md w-[40%] object-cover" />
      <div className="h-[inherit] flex-1 bg-[#02a2440] px-4 py-2">
        <p className="text-lg font-medium text-[#ababab]">Aug 22, 2024</p>
        <p className="text-xl font-bold text-[#0a2440]">
          The Best are European Materls Direct
        </p>
      </div>
    </div>
  );
};

export default BlogRecentCard;
