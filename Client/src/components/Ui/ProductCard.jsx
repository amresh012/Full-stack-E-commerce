import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import product3 from "../../assets/products/product3.webp";
import { Chip } from "@mui/material";

const ProductCard = () => {
  return (
    <div
      className="inline-block min-w-[350px] h-[545px] rounded bg-white py-2 px-4 border"
      style={{ boxShadow: "0px 0px 10px 9px #fffbfb" }}
    >
      <img loading="lazy" className="h-[330px] w-[350px] px-2 border-b" src={product3}></img>
      <div className="px-4 py-4">
        <Chip sx={{margin: "10px 0"}} variant="outlined" color="warning" size="small" label="15% off" />

        <p className="text-3xl font-bold text-[#0a2440]">Dumbbell</p>
        <div className="flex text-base mt-1 mb-1 text-yellow-400 items-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalf />
          <span className="ml-1 text-black text-lg">(120)</span>
        </div>
        <p className="flex justify-between items-center">
          <span className="text-4xl font-bold mt-3 text-[#0a2440]">&#8377;1,000</span>
          <button className="hover:bg-white text-base px-5 py-3 rounded-md bg-[#144170] text-white duration-500 ease-in-out hover:text-[#0a2440]">Add To Cart</button>
          </p>
      </div>
    </div>
  );
};

export default ProductCard;
