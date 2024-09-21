import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Chip, Rating } from "@mui/material";
import { FaCheckCircle, FaGlobe, FaLock, FaPen, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { toast, Toaster } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { base_url } from "../../Utils/baseUrl";
import { addcarts, removeItem } from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAddCartHook } from "../../hooks/cartHooks";
import axios from "axios"
import moment from "moment"
import { config } from "../../Utils/axiosConfig";

const ProductdetailPage = () => {
  const { id } = useParams();
  const [product, setproduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [reviewvisible, setReviewVisible] = useState(false);
  const [endrating, setEndRating] = useState(4);
  const [reviews, setReviews]= useState([])
  const [like, setLike]= useState(0)
  const [dislike , setDislike] = useState(0)

  
  // const [like , setLike] = useState(() => {
  //   const storedLike = localStorage.getItem(`like`);
  //   return storedLike ? parseInt(storedLike) : 0;
  // })
  // const [dislike , setDislike] = useState(() => {
  //   const storedDislike = localStorage.getItem(`dislike`);
  //   return storedDislike ? parseInt(storedDislike) : 0;
  // })

  const [userReaction, setUserReaction] = useState(null); 
  const dispatch = useDispatch();
  const { carts } = useSelector(state => state.cart);
  const  user  = useSelector((state) => state.auth.user);
  const userId = user?._id
  const UserName = user?.name

  // mutation hook
  const { mutation } = useAddCartHook(); // React Query hook for adding items to cart
  const token = localStorage.getItem("token")

  // fetch Product Reviews
  const fetchProductReviews = async () => {
    try{
      const response = await axios.get(`${base_url}review/${id}`)
      if(response.data.success){
        setReviews(response.data.reviews)
      }
    }
    catch(error){
         console.log(error)
    }
  }
  // like a review
  const likeReview = async (reviewId) => {
    try{
      const response = await axios.post(`${base_url}review/${id}/${reviewId}/like`,{}, config)
      if(response.data.success){
        toast.success(response.data.message)
        if (userReaction === "dislike") {
          setDislike(dislike - 1);
        }

        // Update the like count
        setLike(like + 1);
        setUserReaction("like");
        // setLike(response.data.likes)
      }
      else{
        toast.error(response.data.message)
      }
      
    }
    catch(error){
      console.log(error)
    }
  }
  // like a review
  const dislikeReview = async (reviewId) => {
    try{
      const response = await axios.post(`${base_url}review/${id}/${reviewId}/dislike`,{}, config)
      if(response.data.success){
        toast.success(response.data.message)
        if (userReaction === "like") {
          setLike(like - 1);
        }

        // Update the dislike count
        setDislike(dislike + 1);
        setUserReaction("dislike");
        // setDislike(response.data.dislike)
      }
      else{
       throw new Error()
      }
      
    }
    catch(error){
      console.log(error)
    }
  }

  // useEffect(() => {
  //   const storedLike = localStorage.getItem(`like`);
  //   const storedDislike = localStorage.getItem(`dislike`);
  //   if (storedLike) setLike(parseInt(storedLike));
  //   if (storedDislike) setDislike(parseInt(storedDislike));
  // }, [like]);

  useEffect(()=>{
    fetchProductReviews()
  },[])

  // fetch product by id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${base_url}product/${id}`);
        const data = await response.json();
        setproduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
    fetchProductReviews()
  }, [id]);

  // add tocart 
  const handleCart = (product) => {
    const { _id } = product;
    mutation.mutate({ id: _id, qty: 1 });
    toast.success("Product Added Successfully")
  };

  // remove item from cart
  useEffect(()=>{
    getQuantity();
  }, [carts])

  const handleLoadReviews = () => {
    token
      ? setEndRating(endrating + 2)
      : toast.error("Your Are Not Logged In");
  };

  const handleReviewView = () => {
  token
      ? setReviewVisible(!reviewvisible)
      : toast.error("Your Are Not Logged In");
  };

  const handleIncr = () => {
    dispatch(addcarts(product));
  };
  const handleDecr = (id) => {
    dispatch(removeItem(product));
  };

  const getQuantity = ()=>{
    const isExistingInd = carts.findIndex(product => product._id === id);
    setQuantity(isExistingInd === -1 ? 0 : carts[isExistingInd].quantity);
  }

  function capitalizeFirstLetter(str) {
    return str?.replace(/\b\w/g, (char) => char.toUpperCase());
  }


  return (
    <>
      <Toaster />
      <div className="">
        <div className=" p-12  flex gap-12 lg:flex-row flex-col ">
          {/* image-container */}
          <div className="w-full">
            <Carousel
              renderIndicator={false}
              autoPlay={true}
              infiniteLoop={true}
              showStatus={false}
              showArrows={false}
              dynamicHeight={true}
            >
              {product?.images?.map((item, index) => (
                <img src={item} alt="" key={index} className=" object-cover" />
              ))}
            </Carousel>
          </div>
          {/* image-container-end */}
          <div className="details-container flex flex-col ">
            <h1 className="font-bold space-x-12 bg-gray-200 w-fit p-2 rounded-md mb-4">
              {capitalizeFirstLetter(product?.category)} /{" "}
              <span>{capitalizeFirstLetter(product?.subcategory)}</span>
            </h1>
            <Rating
              name="half-rating"
              value={4.9}
              defaultValue={2.5}
              precision={0.5}
            />
            <p className="product-name text-2xl">{product?.name}</p>
            {product?.variant && <span>{product?.variant}</span>}
            <div className="price">
              {product?.corporateDiscount &&
                product?.corporateDiscount !== "0" && (
                  <div className="discount">
                    <Chip
                      sx={{ margin: "10px 0" }}
                      color="success"
                      size="small"
                      label={product.corporateDiscount + "% off"}
                    />
                  </div>
                )}
              {!product?.corporateDiscount ||
                (product?.corporateDiscount === "0" && (
                  <span className="text-2xl font-bold">
                    Rs{" "}
                    {(+product?.price)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </span>
                ))}
              {product?.corporateDiscount &&
                product?.corporateDiscount !== "0" && (
                  <span className="text-2xl font-bold line-through text-red-500">
                    Rs{" "}
                    {(+product?.price)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </span>
                )}
              {product?.corporateDiscount &&
                product?.corporateDiscount !== "0" && (
                  <span className="ml-2 text-2xl font-bold">
                    Rs{" "}
                    {(
                      product.price -
                      product.price * (product.corporateDiscount / 100)
                    )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </span>
                )}
            </div>
            <div className="description w-full mt-4 leading-8 tracking-wider ">
              <div className="desc group w-full">
                <p className="Font-oswald">
                  {product?.mindiscription.slice(0, 200)}...
                </p>
              </div>
            </div>
            <div className="pt-2 text-gray-500 font-bold italic">
              <p>UPI & Cards Accepted , Online approvals in 2 minute</p>
            </div>
            <div className="qua space-y-4  mt-2">
              <h1 className="font-bold  text-xl">Quantity</h1>
              <div className="flex items-center  gap-2  rounded-full bg-[#0A2440]/10  w-fit p-2">
                <button
                  className="bg-[#0A2440] active:scale-95 h-6 w-6 rounded-full text-white  "
                  onClick={handleIncr}
                >
                  +
                </button>
                <p className="">{quantity}</p>
                <button
                  className="bg-[#0A2440] h-6 w-6 active:scale-95 rounded-full text-white "
                  onClick={handleDecr}
                >
                  -
                </button>
              </div>
            </div>
            <div className="diemnsions p-4">
              <h1 className="text-2xl">Dimensions:</h1>
              <p className="text-gray-500 font-bold italic">
                length: {product?.length}cm
              </p>
              <p className="text-gray-500 font-bold italic">
                height: {product?.height}cm
              </p>
              <p className="text-gray-500 font-bold italic">
                weight: {product?.weight}kg
              </p>
              <p className="text-gray-500 font-bold italic">
                width: {product?.width}cm
              </p>
            </div>
            <div
              className="action-buttons flex flex-col gap-4 my-6"
              onClick={() => handleCart(product)}
            >
              <button className="border px-12 py-3 hover:bg-[#0a2444]/80 text-white   active:scale-95 duration-300 bg-[#0a2444]">
                Add to Cart
              </button>
            </div>
            <div className="shipping-info ">
              <p className="">
                <span className="text-red-500 animate-pulse">**</span> Tax
                included<sapn className="underline px-1">Shipping</sapn>
                calculated at checkOut
              </p>
            </div>
            <div className="availibility">
              {product?.quantity > 0 ? (
                <p className="flex items-center gap-2 text-xl text-green-500 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  In Stock, Ready to Ship
                </p>
              ) : (
                <p className="flex items-center gap-2 text-xl text-red-500 font-medium">
                  <div className="w-2 h-2 rounded-full  bg-red-500 animate-pulse"></div>
                  Out Of Stock
                </p>
              )}
            </div>
            {/* shipping features */}
            <div className="shipping-features flex justify-around items-center p-2 border-b-2 border-t-2 lg:m-4 border-black">
              <div className="flex gap-2 flex-col items-center  lg:p-4">
                <FaGlobe size={30} />
                <p>Pan India Shipping</p>
              </div>
              <div className="flex  flex-col items-center p-4">
                <FaGlobe size={30} />
                <p>Highly Durable</p>
              </div>
              <div className="flex  flex-col items-center p-4">
                <FaLock size={30} />
                <p>Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ********************************************************************************************************************* */}
      {/* customer reviews */}
      <div className="">
        <div className="heading w-full  font-bold text-3xl lg:text-start p-4 text-center">
          Customer Reviews
        </div>
        <div className="border-b-2  py-4 px-2 mx-4">
          <div className="left-content  flex  justify-between px-12  items-center">
            <div className=" text-xl font-bold text-center">
              <p className="flex items-center gap-2">
                {product?.rating}{" "}
                <Rating
                  name="half-rating"
                  value={product?.rating}
                  readOnly
                  defaultValue={4.5}
                  precision={0.5}
                />
              </p>
              <p className="font-medium lg:text-sm text-base">
                Based on {product?.numReviews} review(s)
              </p>
            </div>
            <div
              className="rightcontent border-2 flex items-center justify-center duration-300 gap-2 p-2 hover:bg-black border-black hover:text-white"
              onClick={handleReviewView}
            >
              <button>Write a Review</button>
              <FaPen />
            </div>
          </div>
        </div>
        {reviewvisible && (
          <div className="">
            <ReviewForm productId={id} userId={userId} UserName={UserName} func={fetchProductReviews} />
          </div>
        )}
        
        <div className="rating-container flex flex-wrap  p-4 ">
          <div className="reviews flex  flex-wrap  justify-center">
            {reviews.slice(0, endrating).map((review) => {
              return (
                <div
                  className="each-review  w-[30rem] gap-2 p-4 "
                  key={review.user.name}
                >
                  <div className="header flex justify-between   items-start">
                    <div className="left-side-header flex items-start justify-start gap-2">
                      <Avatar
                        sx={{
                          textTransform: "uppercase",
                          bgcolor: "black",
                          width: 44,
                          height: 44,
                        }}
                      >
                        {review.user.name.slice(0, 2)}
                      </Avatar>
                      <div className="flex gap-12 items-center justify-around w-full ">
                        <div className="text-base font-bold">
                          <div className="flex flex-col">
                          <p className="name ">{review.user.name}</p>
                          <span className="">
                          {review?.user?._id ? (
                            <div className="flex items-center gap-1 text-xs">
                              <FaCheckCircle
                                size={9}
                                className="text-blue-500"
                              />
                              <p className="text-zinc-500">Verified User</p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500">
                               Anonymous       
                            </p>
                          )}
                        </span>
                            
                          </div>
                          <Rating
                            className=""
                            name="size-small"
                            value={review.rating}
                            readOnly
                            defaultValue={review.rating}
                            precision={0.5}
                          />
                          
                        </div>
                        
                      </div>
                    </div>
                    <div className="date text-xs lg:pt-0 pt-2 text-zinc-600">
                      <p>{moment(review.createdAt).format('l LT')}</p>
                    </div>
                  </div>
                  <div className="body">
                    <h1 className="font-bold text-xl">{review?.title}</h1>
                    <p>{review?.review}</p>
                  </div>
                  <div className="flex gap-2 cursor-pointer items-center py-2 w-fit justify-center">
                    <p className="flex gap-2  rounded-md p-1 bg-gray-100">
                      <span onClick={()=>likeReview(review._id)} className="">Like {like}</span>
                       <div className={like && "text-blue-500"}>
                       <FaThumbsUp />
                       </div>
                    </p>
                    <p className="flex gap-2 items-center p-1  rounded-md bg-gray-100">
                      <span onClick={()=>dislikeReview(review._id)} className="">Dislike {dislike}</span>
                      <div className={dislike && "text-red-500"}>
                      <FaThumbsDown />
                       </div>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
       {reviews.length >=4 &&  <div
          onClick={handleLoadReviews}
          className="flex text-white active:scale-95 hover:shadow-md duration-300  items-center justify-center m-12 bg-black/50 p-2 w-fit"
        >
          <button>Load More Reviews</button>
        </div>}
      </div>
    </>
  );
};

export default ProductdetailPage;
