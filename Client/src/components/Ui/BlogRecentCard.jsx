import React from "react";
import img from "../../assets/about-1.jpg";

const BlogRecentCard = () => {
  return (
    <div className="flex w-full h-[9rem] md:w-[28rem]">
      <img loading="lazy" src={img} className="h-[inherit] w-[40%] object-cover" />
      <div className="border h-[inherit] flex-1 bg-[#02a2440] px-4 py-2">
        <p className="text-lg font-medium text-[#ababab]">Aug 22, 2024</p>
        <p className="text-xl font-bold text-[#0a2440]">
          The Best are European Materls Direct
        </p>
      </div>
    </div>
  );
};

export default BlogRecentCard;
