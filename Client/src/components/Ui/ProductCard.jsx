import { Chip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import img from "../../assets/GymEquipmentPng/3d-gym-equipment (1).png"
const ProductCard = ({ product, addToCartHandler }) => {
  const { _id, images,name, price,rating,reviews, corporateDiscount } = product;
  const discountedPrice = (price - price * (corporateDiscount / 100)).toFixed(2);
  
  return (
    <div
      key={_id}
      className="relative min-h-[30vh] min-w-[20vw] rounded-lg p-2 border bg-white"
    >
      <Link to={`/product/${_id}`}>
        <img
          loading="lazy"
          className="max-h-[35vh] max-w-[25vw] rounded-2xl"
          src={images[0] || img}
          alt={name}
        ></img>
      </Link>
       <div className="">
          <Link to={`/product/${_id}`}>
            <h1 className="text-sm text-gray-800 font-medium">{name}</h1>
          </Link>
          <div className="flex gap-1">
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <p className="text-xs text-gray-500">{reviews}Reviews</p>
          </div>
          <div className="flex gap-1">
            <p className="text-sm text-gray-800 font-medium">
              ${discountedPrice}
            </p>
            <p className="text-xs text-gray-500 line-through">${price}</p>
            <Chip
              label={`${corporateDiscount}% OFF`||"0% OFF"}
              size="small"
              color="primary"
            />
          </div>
       </div>
         <div className="mt-4 grid grid-cols-2 gap-2">
         <button
            onClick={() => addToCartHandler(product)}
            className="bg-gray-100 p-2 rounded-lg"
          >
            Add To Cart
          </button>
          <button className="bg-[#0a2440] text-white rounded-lg">Buy Now</button>
         </div>
      </div>
  );
};

export default ProductCard;
