import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";

const TestimonialCarousel = () => {
    const ProductCarouselRef = useRef();

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
  
    useEffect(()=>{
      showBtns();
    }, [])

  return (
    <div className="relative px-4">
      {prevBtnEnabled && (
        <div className="absolute z-50 text-3xl top-1/2 left-0 text-[#144170]" onClick={prevClickHandler}>
          <FaChevronLeft />
        </div>
      )}
      {nextBtnEnabled && (
        <div className="absolute z-50 text-3xl top-1/2 right-0 text-[#144170]" onClick={nextClickHandler}>
            <FaChevronRight />
        </div>
      )}
      <div className="flex w-[100%] gap-x-2 overflow-hidden scroll-smooth" ref={ProductCarouselRef}>
           {Array(5).fill(0).map((item, ind)=>{
            return <TestimonialCard key={ind} />
          })}
        </div>
    </div>
  )
}

export default TestimonialCarousel