import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { base_url } from "../../Utils/baseUrl";

const ProductCarousel = ({addToCartHandler}) => {
  const ProductCarouselRef = useRef();

  // const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  // const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [products, setProducts] = useState([]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  //   const navigate = useNavigate();

  const showBtns = () => {
    const showPrev = ProductCarouselRef.current.scrollLeft > 0;
    const showNext =
      ProductCarouselRef.current.scrollLeft <
      ProductCarouselRef.current.scrollWidth -
        ProductCarouselRef.current.offsetWidth;

    setPrevBtnEnabled(showPrev);
    setNextBtnEnabled(showNext);
  };

  const prevClickHandler = () => {
    ProductCarouselRef.current.scrollLeft -= 400;
    showBtns();
  };

  const nextClickHandler = () => {
    ProductCarouselRef.current.scrollLeft += 400;
    showBtns();
  };

  const fetchProducts = async () => {
    let response = await fetch(`${base_url}product`);
    let data = await response.json();
    setProducts(data);
    // 
  };

  useEffect(() => {
    fetchProducts();
    showBtns();
  }, []);

  return (
    <div className="relative px-4">
      {prevBtnEnabled && (
        <div
          className="absolute cursor-pointer z-50 text-3xl top-1/2 left-0 bg-[#144170] p-2 text-white rounded hover:scale-105"
          onClick={prevClickHandler}
        >
          <FaChevronLeft />
        </div>
      )}
      {nextBtnEnabled && (
        <div
          className="absolute cursor-pointer z-50 text-3xl top-1/2 right-0 bg-[#144170] p-2 text-white rounded hover:scale-105"
          onClick={nextClickHandler}
        >
          <FaChevronRight />
        </div>
      )}
      <div
        className="flex w-[100%] min-h[1rem] gap-x-2 overflow-hidden scroll-smooth"
        ref={ProductCarouselRef}
      >
        {products.length > 0 && products.slice(0,10).map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  addToCartHandler={addToCartHandler}
                  product={product}
                />
              );
            })}
        {products.length === 0 &&
          Array(10)
            .fill({
              _id: 0,
              name: "",
              category: "",
              corporateDiscount: 0,
              images: [""],
              price: 0,
            })
            .map((product, ind) => {
              return <ProductCard key={ind} product={product} />;
            })}
      </div>
    </div>
  );
};

export default ProductCarousel;
