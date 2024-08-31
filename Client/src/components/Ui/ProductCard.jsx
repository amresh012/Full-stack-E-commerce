import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import product3 from "../../assets/products/product3.webp";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCartHandler }) => {
  const { _id, images, name, price, category, corporateDiscount } = product;
  const discountedPrice = (price - price * (corporateDiscount / 100)).toFixed(2);

  return (
    <div
      key={_id}
      className="relative inline-block min-w-[350px] h-[507px] rounded bg-white py-2 px-4 border"
      style={{ boxShadow: "0px 0px 10px 9px #fffbfb" }}
    >
      <Link to={`/product/${_id}`}>
        <img
          loading="lazy"
          className="h-[330px] w-[350px] px-2 border-b"
          src={images[0]}
        ></img>
      </Link>
      <div className="px-4 py-4">
        {corporateDiscount > 0 && (
          <div className="absolute top-[0.5rem] left-[2rem]">
            <Chip
              sx={{ margin: "10px 0" }}
              color="success"
              size="small"
              label={corporateDiscount + "% off"}
            />
          </div>
        )}

        <Link to={`/product/${_id}`}>
          <p className="text-xl font-bold text-[#0a2440] h-[3rem] overflow-hidden">
            {name.substr(0, 30) + (name.length > 50 && "...")}
          </p>
        </Link>
        <div className="flex text-base mt-1 mb-1 text-yellow-400 items-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalf />
          <span className="ml-1 text-black text-lg">(120)</span>
        </div>
        <p className="flex justify-between items-center">
          <div className="flex flex-col gap-y-0">
            <span
              style={{
                textDecoration: `${
                  corporateDiscount > 0 ? "line-through" : ""
                }`,
                color: `${corporateDiscount > 0 ? "#ff5050" : "#0a2440"}`,
                fontSize: `${corporateDiscount > 0 ? "15px" : "20px"}`,
              }}
              className="font-bold mt-2"
            >
              &#8377;{(+price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </span>
            {corporateDiscount > 0 && (
              <span className="text-2xl -mt-2 font-bold text-[#0a2440]">
                &#8377;{+parseInt(discountedPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCartHandler(product)}
            className="hover:bg-white text-base px-5 py-3 rounded-md bg-[#144170] text-white duration-500 ease-in-out hover:text-[#0a2440]"
          >
            Add To Cart
          </button>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
