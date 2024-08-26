// import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CgGym } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Clients } from "../../constant";

import hero_bg from "../../assets/hero/hero_bg.jpg";
import weight_reck from "../../assets/GymEquipmentPng/weight-reck.jpg";
import weight_bench from "../../assets/GymEquipmentPng/weight-bench.jpg";
import treadmill from "../../assets/GymEquipmentPng/treadmill.jpg";
import gym_machine from "../../assets/GymEquipmentPng/gym-machine.jpg";
import barbell from "../../assets/GymEquipmentPng/barbell.jpg";
import dumbbell from "../../assets/GymEquipmentPng/dumbbell.jpg";
import product1 from "../../assets/products/product1.webp";
import product2 from "../../assets/products/product2.webp";
import product3 from "../../assets/products/product3.webp";
import why_us_1 from "../../assets/why-us-1.jpg";
import why_us_2 from "../../assets/why-us-2.jpg";
import ProductCard from "../../components/Ui/ProductCard";
import ProductCarousel from "../../components/Ui/ProductCarousel";
import TestimonialCard from "../../components/Ui/TestimonialCard";
import TestimonialCarousel from "../../components/Ui/TestimonialCarousel";
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

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div
        className="relative h-[30rem] md:h-[40rem] flex flex-col gap-12 justify-center items-center w-full bg-top bg-cover bg-[#038cccab] bg-blend-multiply"
        style={{ backgroundImage: `url(${hero_bg})` }}
      >
        <div className="searchbar shadow-2xl -mt-12 w-fit  flex justify-center items-center rounded-md  overflow-clip">
          <input type="search" className="h-12 w-[30rem] placeholder:px-2 px-2 outline-none" placeholder="Search for any product..." />
          <button className="text-white bg-[#144170] p-4"><FaSearch/></button>
        </div>
        <div className="text-white text-7xl lg:w-[73%] w-full text-center uppercase">
          <p className="font-semibold lg:text-2xl text-[3rem]">
            Build your dream gym with us
          </p>
          <p className="font-bold text-3xl sm:text-6xl">
            Ultimate Fitness Equipment Brand
          </p>

          <button className="uppercase text-lg lg:text-2xl bg-white px-8 py-3 rounded-md font-semibold text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white duration-500 ease-in-out">
            <Link to="/product">
              <div className="flex font-light items-center justify-center gap-x-1">
                Shop Now
                <IoIosArrowRoundForward />
              </div>
            </Link>
          </button>
        </div>
      </div>

      <div className="mt-24  px-8">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Our Clients
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[120px] bg-[#0a2440] mb-16"></div>

        <div>
          <Marquee pauseOnClick={true} speed={30}>
            {Clients.map((client) => (
              <div key={client.id}>
                <img
                  loading="lazy"
                  src={client.imgurl}
                  className="grayscale hover:grayscale-0 h-[10rem] w-[12rem] mx-2"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="mt-24 px-6">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Recommended For You
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[170px] bg-[#0a2440] mb-16"></div>

        <div>
          <ProductCarousel />
        </div>
      </div>

      <div className="mt-24">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Premium Fitness Equipment Without the Premium Price
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440] mb-16"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={barbell}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Barbells</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/product" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={dumbbell}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Dumbbells</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/product" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={weight_bench}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Weight Benches</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/product" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={weight_reck}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Weight Recks</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/product" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden">
            <img
              loading="lazy"
              className="hover:scale-105 h-[inherit] w-[inherit] duration-500 brightness-50"
              src={treadmill}
            ></img>
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-4xl uppercase font-thin">Treadmills</p>
              <p className="text-xl uppercase font-thin">
                <Link to="/product" className="flex items-center">
                  Shop Now <IoIosArrowRoundForward color="white" size={30} />
                </Link>
              </p>
            </div>
          </div>
          <div className="relative h-[25rem] lg:h-[40rem] w-full bg-top bg-cover overflow-hidden">
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

        <p className="text-lg font-light mb-8">
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
      <div className="Our-Solution mt-24 space-y-8">
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
        {/* <div className="flex flex-wrap lg:flex-nowrap gap-12 items-center justify-center "> */}
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
          {[...Array(3)].map((id) => (
            <div
              className=" relative hover:scale-105 duration-700 overflow-clip cursor-pointer card rounded-md  w-full"
              key={id}
              data-aos="flip-up"
              data-aos-delay="50"
            >
              <div className="circlem h-24 absolute -top-2  -right-6 w-24 rounded-full border-4 border-white bg-[#0a2440]">
                <CgGym size={55} className="m-4 text-white " />
              </div>
              <div className="Gym-setup rounded-md border ">
                <h1 className="text-xl lg:text-4xl p-4 bg-gradient-to-tr text-white bg-[#0a2440]">
                  Gym Setup
                </h1>
                <ol className="list-decimal px-12 py-6 space-y-4">
                  <li className="text-base lg:text-lg font-extralight">
                    World class equipment
                  </li>
                  <li className="text-base lg:text-lg font-extralight">
                    Pan-India service
                  </li>
                  <li className="text-base lg:text-lg font-extralight">
                    Fitternity listing and lead gen support
                  </li>
                  <li className="text-base lg:text-lg font-extralight">
                    Full demand management guarantee
                  </li>
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 flex flex-col lg:flex-row h-auto lg:h-[50rem] w-full">
        <div className="relative flex-1 overflow-hidden lg:h-[inherit]">
          <img
            loading="lazy"
            src={why_us_1}
            className="hover:scale-105 duration-500 brightness-50 object-top lg:object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full lg:h-inherit w-full lg:w-inherit"
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
            className="hover:scale-105 duration-500 brightness-50 object-top lg:object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] lg:h-inherit w-[100vw] lg:w-inherit"
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
          <LatestBlogCard />
          <LatestBlogCard />
          <LatestBlogCard />
        </div>
      </div>

      <div className="mt-24 mb-16 w-full">
        <BMICalculator />
      </div>

      <div className="mt-24 mb-16">
        <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
          Testimonials
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[120px] bg-[#0a2440] mb-16"></div>

        <div className="px-4">
          <TestimonialCarousel />
        </div>
      </div>
    </>
  );
};

export default HomePage;
