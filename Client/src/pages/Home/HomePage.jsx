// import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Clients, gymEcommerceSolutions } from "../../constant";
import hero_bg from "../../assets/hero/hero_bg.jpg";
import weight_reck from "../../assets/GymEquipmentPng/weight-reck.jpg";
import weight_bench from "../../assets/GymEquipmentPng/weight-bench.jpg";
import treadmill from "../../assets/GymEquipmentPng/treadmill.jpg";
import gym_machine from "../../assets/GymEquipmentPng/gym-machine.jpg";
import barbell from "../../assets/GymEquipmentPng/barbell.jpg";
import dumbbell from "../../assets/GymEquipmentPng/dumbbell.jpg";
import why_us_1 from "../../assets/why-us-1.jpg";
import why_us_2 from "../../assets/why-us-2.jpg";
import ProductCarousel from "../../components/Ui/ProductCarousel";
import achievements1 from "../../assets/achievements-1.jpg";
import achievements2 from "../../assets/achievements-2.jpg";
import achievements3 from "../../assets/achievements-3.jpg";
import achievements4 from "../../assets/achievements-4.jpg";
import achievements5 from "../../assets/achievements-5.jpg";
import achievements6 from "../../assets/achievements-6.jpg";
import achievements7 from "../../assets/achievements-7.jpg";
import achievements8 from "../../assets/achievements-8.jpg";
import LatestBlogCard from "../../components/Ui/LatestBlogCard";
import BMICalculator from "../../components/BMICalculator/BMICalculator";
import { toast } from "react-hot-toast";
import {base_url} from '../../Utils/baseUrl';
import { config } from "../../Utils/axiosConfig";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BiArrowToRight } from "react-icons/bi";
import { useMediaQuery } from "@mui/material";
import { FcCheckmark } from "react-icons/fc";
import { useAddCartHook } from "../../hooks/cartHooks";


const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const { mutation } = useAddCartHook(); // React Query hook for adding items to cart
  const token= localStorage.getItem("token")
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");
  let blogNumber = isTablet ? 4 :3

  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  const allBlogs = async () => {
    try {
      const response = await axios.get(base_url+'blog', config);
      const data = response.data;
      setBlogs(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addToCartHandler = (item)=>{
    const { _id } = item;
    mutation.mutate({ id: _id, qty: 1 });
    token && toast.success("Product Added Successfully")
  }

  useEffect(()=>{
    allBlogs();
  }, []);
  // const url = "https://kfsecommerce.deepmart.shop/"
  const url = "http://localhost:5173/"

  return (
    <>
      <div
        className="relative overflow-clip h-[30rem] md:h-[40rem] flex flex-col gap-12 justify-center items-center w-full bg-top bg-cover bg-[#038cccab] bg-blend-multiply"
        style={{ backgroundImage: `url(${hero_bg})` }}
      >
        <div
          className="text-white space-y-2  lg:w-[73%] w-full text-center uppercase"
          data-aos="zoom-in"
        >
          <p className="font-semibold lg:text-2xl text-[3rem]">
            Build your dream gym with us
          </p>
          <p className="font-bold text-3xl sm:text-6xl">
            Ultimate Fitness Equipment Brand
          </p>

          <button className="uppercase  hover:bg-white px-8 py-3 rounded-md font-semibold hover:text-[#0c0c0cdb] bg-[#144170] text-white duration-500 ease-in-out">
            <Link to="/product">
              <div className="flex font-light items-center justify-center gap-x-1">
                Shop Now
                <IoIosArrowRoundForward />
              </div>
            </Link>
          </button>
        </div>
      </div>

      <div className="mt-24 overflow-clip mb-4 p-6">
       <div className="flex items-center justify-between w-full px-6 py-4">
       <h1 className="uppercase text-center min-w-max text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Recommended For You
        </h1>
        <Link
          to="/product"
          className=" flex justify-end text-xs  items-center  p-2   gap-2"
        >
          <button type="button" className="uppercase">
            View All
          </button>
          <IoIosArrowRoundForward size={25} />
        </Link>
       </div>
        <div data-aos="zoom-out" className="" data-aos-once="true">
          <ProductCarousel addToCartHandler={addToCartHandler} />
        </div>
      </div>

      <div className="mt-24">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Premium Fitness Equipment Without the Premium Price
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440] mb-16"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div
            className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden "
            data-aos="zoom-out"
            data-aos-once="true"
          >
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={barbell}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Barbells</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/category/barbells" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden" data-aos="zoom-out" data-aos-once="true">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={dumbbell}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Dumbbells</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/category/dumbbells" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden" data-aos="zoom-out" data-aos-once="true">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={weight_bench}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Weight Benches</p>
              <p className="text-xl uppercase font-thin">
                <Link
                  to={`${url}product-category/category?=benches-and-racks&subcategory?=benches`}
                  className="flex items-center"
                >
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden" data-aos="zoom-out" data-aos-once="true">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={weight_reck}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Weight Racks</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/category/weight-racks" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden" data-aos="zoom-out" data-aos-once="true">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={treadmill}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Treadmills</p>
              <p className="text-xl uppercase font-thin">
                <Link to={`${url}product-category/category?=cardio&subcategory?=treadmill`} className="flex items-center" data-aos-once="true">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden" data-aos="zoom-out" data-aos-once="true">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={gym_machine}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Gym Machines</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/product" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 px-4">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Achievements
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440] mb-8"></div>

        <p className="text-lg font-light mb-8 text-center max-w-3xl mx-auto">
          At our core, we are passionate about helping our customers lead
          healthier, more active lives. These nominations are a testament to our
          commitment to excellence and the impact we have made in the fitness
          industry. We are honored to be recognized alongside other esteemed
          brands and industry leaders.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements1}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements2}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements3}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements4}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements5}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements6}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements7}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
          <div className="overflow-hidden h-[24rem] w-full">
            <img
              loading="lazy"
              src={achievements8}
              className="w-full h-[inherit] ease-in-out duration-500 object-cover hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Our Solutions */}
      <div className="Our-Solution flex flex-col h-full gap-12 py-12 bg-gray-100 ">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
            Our Solutions
          </h1>
          <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440]"></div>
          <p className="lg:px-44  p-4 text-lg font-light mb-2">
            With deep domain expertise and knowhow, we bring a wide variety of
            solutions to make the gym opening and running process smooth &
            hassle free
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 p-2">
          {gymEcommerceSolutions.map((sol) => (
            <div
              className="flex flex-col justify-around p-4   bg-white rounded-2xl duration-300 "
              key={sol.category}
            >
              <h1 className="heading text-center text-2xl font-bold p-4 uppercase">
                {sol.category}
              </h1>
              <ul>
                {sol.solutions.map((solution, index) => (
                  <li key={index} className="p-2">
                    <strong className="uppercase flex">{solution.feature}:</strong>
                    <div className="flex items-start">
                    <span className="text-green-500 pt-1"><FcCheckmark/></span>
                    {" "}
                    {solution.description}
                    </div>
                    
                  </li>
                ))}
              </ul>
             <Link to="/contact">
             <div className="bg-[#0a2444] w-fit p-2 text-white cursor-pointer flex gap-2 items-center">
                <p className="">Know More</p>
                <BiArrowToRight />
              </div>
             </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 flex flex-col lg:flex-row h-auto lg:h-[50rem] w-full">
        <div className="relative flex-1 overflow-hidden lg:h-[inherit]">
          <img
            loading="lazy"
            src={why_us_1}
            className="object-cover hover:scale-105 duration-500 brightness-50 object-top lg:object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full lg:h-inherit w-full lg:w-inherit"
          />
          <div className="relative h-[25rem] lg:h-[inherit] w-[80%] flex justify-center mx-auto flex-col">
            <h1 className="text-center uppercase italic text-4xl lg:text-7xl font-bold text-white">
              Sweat is fat crying
            </h1>
            <p className="capitalize text-lg lg:text-3xl text-white text-center font-light">
              A humorous yet motivating way to view sweat as a sign of hard work
              paying off.
            </p>
            <p className="capitalize text-lg lg:text-3xl text-white text-center font-light">
              It reinforces that the effort you put in is directly related to
              your fitness results
            </p>
          </div>
        </div>
        <div className="w-full px-4 lg:px-0 py-4 lg:py-0 lg:w-[40%] flex justify-center items-center bg-[#0a2440]">
          <div className="w-[80%]">
            <div className="mb-5">
              <h1 className="uppercase text-lg lg:text-2xl font-bold italic text-white">
                Exceptional Value
              </h1>
              <p className="text-white font-light text-base lg:text-lg">
                We believe in providing high-quality equipment at competitive
                prices. Our team works hard to offer you the best deals without
                compromising on performance or durability.
              </p>
            </div>
            <div className="mb-5">
              <h1 className="uppercase text-lg lg:text-2xl font-bold italic text-white">
                Quality You Can Trust
              </h1>
              <p className="text-white font-light text-base lg:text-lg">
                Our fitness equipment is sourced from top manufacturers and
                built to withstand rigorous workouts. We ensure every product
                meets stringent quality standards, so you can train confidently
                and safely.
              </p>
            </div>
            <div className="mb-5">
              <h1 className="uppercase text-lg lg:text-2xl font-bold italic text-white">
                Fast & Reliable Shipping
              </h1>
              <p className="text-white font-light text-base lg:text-lg">
                We understand the excitement of getting started on your fitness
                journey, so we ensure prompt and reliable shipping. Your
                equipment will arrive safely and on time, so you can start your
                workouts without delay.
              </p>
            </div>

            <div className="mt-10">
              <button className="bg-white text-base px-4 py-1 lg:text-lg lg:px-8 lg:py-3 rounded-sm hover:bg-[#144170] hover:text-white duration-500 ease-in-out">
                <Link className="flex gap-x-1 items-center" to="/product">
                  Shop Now
                  <IoIosArrowRoundForward size={30} />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0 flex flex-col-reverse lg:flex-row h-auto lg:h-[50rem] w-full">
        <div className="px-4 lg:px-0 py-4 lg:py-0 w-full lg:w-[40%] flex justify-center items-center bg-[#0a2440]">
          <div className="w-[80%]">
            <div className="mb-5">
              <h1 className="uppercase text-lg lg:text-2xl font-bold italic text-white">
                Outstanding Customer Service
              </h1>
              <p className="text-white font-light text-base lg:text-lg">
                From pre-purchase inquiries to post-purchase support, we’re
                committed to providing excellent customer service. Your
                satisfaction is our top priority, and we’re here to assist you
                every step of the way.
              </p>
            </div>
            <div className="mb-5">
              <h1 className="uppercase text-lg lg:text-2xl font-bold italic text-white">
                Comprehensive Warranty
              </h1>
              <p className="text-white font-light text-base lg:text-lg">
                Our products come with robust warranties, giving you peace of
                mind and confidence in your investment. We stand behind the
                quality of our equipment and are here to support you should any
                issues arise.
              </p>
            </div>
            <div className="mb-5">
              <h1 className="uppercase text-lg lg:text-2xl font-bold italic text-white">
                Customer-Centric Approach
              </h1>
              <p className="text-white font-light text-base lg:text-lg">
                Your feedback drives us. We continuously strive to improve our
                offerings based on your needs and preferences, ensuring that we
                provide the best possible experience for our valued customers.
              </p>
            </div>

            <div className="mt-10">
              <button className="bg-white text-base px-4 py-1 lg:text-lg lg:px-8 lg:py-3 rounded-sm hover:bg-[#144170] hover:text-white duration-500 ease-in-out">
                <Link className="flex gap-x-1 items-center" to="/product">
                  Shop Now
                  <IoIosArrowRoundForward size={30} />
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden lg:h-[inherit]">
          <img
            loading="lazy"
            src={why_us_2}
            className="object-cover hover:scale-105 duration-500 brightness-50 object-top lg:object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] lg:h-inherit w-[100vw] lg:w-inherit"
          />
          <div className="relative h-[25rem] lg:h-[inherit] w-[80%] flex justify-center mx-auto flex-col">
            <h1 className="text-center uppercase italic text-4xl lg:text-7xl font-bold text-white">
              Push yourself because no one else is going to do it for you
            </h1>
            <p className="capitalize text-lg lg:text-3xl text-white text-center font-light">
              Encourages self-motivation and personal responsibility. It reminds
              you that ultimately,
            </p>
            <p className="capitalize text-lg lg:text-3xl text-white text-center font-light">
              the drive to achieve your fitness goals must come from within
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 mb-16 px-8">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Latest Blogs
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440] mb-16"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-2">
          {blogs.slice(0, blogNumber).map((blog, i) => (
            <LatestBlogCard blog={blog} key={i} />
          ))}
        </div>
      </div>

      <div className="mt-24 mb-16 w-full">
        <BMICalculator />
      </div>

      {/* <div className="mt-24 mb-16">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Testimonials
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[120px] bg-[#0a2440] mb-16"></div>

        <div className="px-4">
          <TestimonialCarousel />
        </div>
      </div> */}

      <div className="my-24  px-8">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Our Clients
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[120px] bg-[#0a2440] mb-16"></div>

        <div>
          <Marquee pauseOnClick={true} speed={50} autoFill={true}>
            {Clients.map((client) => (
              <div
                key={client.id}
                className="cursor-pointer flex items-center flex-col group"
              >
                <img
                  loading="lazy"
                  src={client.imgurl}
                  className="grayscale hover:grayscale-0 h-[10rem] w-[12rem] mx-2 no-scrollbar"
                />
                <span className="group-hover:text-red-500">
                  {client.location}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default HomePage;
