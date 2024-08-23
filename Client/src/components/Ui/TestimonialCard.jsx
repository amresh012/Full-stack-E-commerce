import React from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { FaStar, FaStarHalf } from "react-icons/fa";
import testimonial from '../../assets/testimonial.jpg';

const TestimonialCard = () => {
  return (
    <div className="px-7 flex flex-col justify-center min-w-[25rem] h-[25rem] rounded bg-white py-1 border">
      <div className="text-lg font-light">
        I’ve been buying fitness equipment online for years, and this site is by
        far the best! The selection is top-notch, and I was able to find
        everything I needed to set up a home gym. The quality of the equipment
        is excellent, and the shipping was fast and hassle-free.
      </div>
      <div className="flex gap-x-2 mt-3 border-t py-5">
        <div>
          <img loading="lazy" className="w-[50px] h-[50px] rounded-full" src={testimonial} />
        </div>
        <div>
          <div className="flex text-lg text-[#0a2440]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className="mt-1 text-2xl text-[#0a2440]">Jessica M</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
