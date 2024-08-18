// import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import Tabs from "../../components/Tab";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Avatar, AvatarGroup, Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { CgGym } from "react-icons/cg";
// import { Collapse } from 'antd';
// import Marquee from "react-fast-marquee";
import AOS from "aos";
import "aos/dist/aos.css";
import {Hero1,Hero2,Hero3,Hero4,Hero5,Hero6,Spin} from "../../assets/images"
import { useEffect } from "react";
// import { Clients, faqs } from "../../constant";
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
      <div className=" flex items-center justify-center bg-gradient-to-l from-slate-950 to-slate-900 overflow-clip">
        <div className="flex w-2/3 items-start   justify-start flex-col  p-12 overflow-clip">
          <h1 className="font-extrabold text-[4.5rem] bg-gradient-to-tr from-white   to-slate-500 text-transparent bg-clip-text">
            <p> Build your dream</p>
            <p> gym with us</p>
          </h1>
          <p className="text-[3rem] font-bold text-white">
            Ultimate Fitness Equipment Brand{" "}
          </p>
          <span className="text-xl  pb-4 text-white">
            We are one of the leading Fitness Equipment Brand in India. Head
            office located in Faridabad.
          </span>
          <div className="rating gap-2 flex items-center py-6 flex-row-reverse">
            <p className="text-white italic">4.8 Over 300+ Reviews</p>
            <Rating
              name="size-small"
              value={4.5}
              defaultValue={2.5}
              precision={0.5}
            />
            <AvatarGroup total={24}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </div>
          <div className="flex gap-6">
            <button className=" p-4  shadow-sm  flex items-center gap-2 rounded bg-white  font-bold ">
              Shop Products <IoIosArrowRoundForward size={30} />
            </button>
            <button className=" p- underline flex items-center gap-2 underline-offset-4  shadow-sm  text-white font-bold">
              Request Consultation <IoIosArrowRoundForward size={30} />
            </button>
          </div>
        </div>
        <div className="carousel w-1/2 h-full">
          <Carousel
            autoplay={true}
            dynamicHeight={true}
            showArrows={false}
            showThumbs={false}
            axis="vertical"
          >
            <img src={Hero1} alt="" className="" />
            <img src={Hero2} alt="" className="" />
            <img src={Hero3} alt="" className="" />
            <img src={Hero4} alt="" className="" />
            <img src={Hero5} alt="" className="" />
            <img src={Hero6} alt="" className="" />
          </Carousel>
        </div>
      </div>
      {/* why us */}
      <div className=" mt-12 overflow-clip">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="font-extrabold tracking-wider text-[3rem]">
            Why Choose us
          </h1>
          <p className="w-1/2 text-center tracking-wider">
            With deep expertise of operating 700+ centres across India, we adopt
            a customer first approach to bring industry first set of solutions
            for your gyms. With best quality equipment, industry leading service
            and a wide variety of benefits for your customers, cult.sport is the
            best choice for your gyms.
          </p>
        </div>
        <div className="mt-12">
          <div className="content">
            <Tabs />
          </div>
        </div>
      </div>
      {/* range of product */}
      <div className="flex flex-col items-center gap-12">
        <div className="head flex flex-col items-center justify-center text-center">
          <h1 className="font-extrabold tracking-wider text-[3rem] underline underline-offset-4">
            Our Product Range
          </h1>
          <p className="font-bold">
            Why KFS Fitness has been successful so far?
          </p>
          <p className="px-44 text-sm py-3 tracing">
            Its because we are increasing profitability by improving our product
            mix. We are specialized in offering a product range to target
            customers of varying ages, income, and tastes.Our product mix is so
            well organized and modified that we are providing the best solution
            for all your fitness equipment needs in your budget.In the
            manufacturing process quality of raw materials used is quite
            important for finished products.This is why we took a strict sample
            test of iron and metal tubes, even bolts, and inspect the quality
            before purchasing.KFS Fitness is growing so rapidly in the market
            only because we are providing highly advanced equipment promising
            stability, product durability, and technical support
          </p>
          {/* <p className="px-44 text-sm py-3">
              We are counted among the most reputed firms engaged in Wholesale
              Trading a range of Chest Press Machine, Fitness Treadmill and Spin
              Exercise Bike.{" "}
            </p> */}
        </div>
        <div className=" flex flex-wrap w-full items-center justify-center gap-2">
          {[...Array(8)].map((_, id) => (
            <div
              className=" cursor-pointer w-[20rem] flex flex-col  rounded-md hover:scale-105 m-2 shadow-sm duration-500 h-[20rem] border-2"
              key={id}
              data-aos="zoom-out"
              data-aos-delay="50"
            >
              <div className="img w-full flex items-center justify-center p-2">
                <img src={Spin} alt="" />
              </div>
              <div className="flex bg-black/80 text-white items-start p-4 justify-start flex-col">
                <h2 className="text-2xl font-bold">Product Name</h2>
                <p className="price-range">12,00.00 - 1,24,435.00</p>
                <Rating
                  name="size-small"
                  value={3.8}
                  defaultValue={2.5}
                  precision={0.5}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="p-4 rounded-md bg-gradient-to-t
         from-slate-800 to-slate-900 text-white flex
          items-center w-fit justify-center hover:-translate-y-2
           duration-300 cursor-pointer hover:shadow-2xl shadow-black"
        >
          <button className="px-12 ">Get a Custom Quote</button>
        </div>
      </div>
      {/* Our Solutions */}
      <div className="Our-Solution mt-12 space-y-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-extrabold tracking-wider text-[3rem] underline underline-offset-4">
            Our Solutions
          </h1>
          <p className="px-44 text-sm py-3">
            With deep domain expertise and knowhow, we bring a wide variety of
            solutions to make the gym opening and running process smooth &
            hassle free
          </p>
        </div>
        <div className="flex gap-12 p-4 items-center justify-center ">
          {[...Array(3)].map((id) => (
            <div
              className=" relative hover:scale-105 duration-700 cursor-pointer card rounded-md w-[25rem] h-[20rem] border-2"
              key={id}
              data-aos="flip-up"
              data-aos-delay="50"
            >
              <div className="circle h-24 absolute -top-12 -right-2 w-24 rounded-full border-4 border-white bg-gradient-to-t from-blue-400 to-blue-500">
                <CgGym size={55} className="m-4 text-white " />
              </div>
              <div className="Gym-setup rounded-md ">
                <h1 className="text-4xl p-4 bg-gradient-to-tr text-white to-slate-800 from-slate-900">
                  Gym Setup
                </h1>
                <ol className="list-decimal px-12 py-4 space-y-4">
                  <li className="">World class equipment</li>
                  <li className="">Pan-India service</li>
                  <li className="">Fitternity listing and lead gen support</li>
                  <li className="">Full demand management guarantee</li>
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* our clients */}
      {/* <div className="flex h-screen items-center justify-center   gap-12">
        <div className="text-[4rem] font-bold  w-1/2">
          <h1>Our Clients</h1>
        </div>
        <div className=" w-1/2 h-full relative">
          <Marquee className="flex gap-2 ">
            {Clients.map((item) => (
              <div
                className="flex flex-col gap-2 p-2 items-center "
                key={item.id}
              >
                <img src={item.imgurl} alt="" className="h-44 w-44" />
                <span>{item.location}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div> */}
      {/* \end{code} */}
      {/* <div className="faqs h-screen flex flex-col items-center justify-center">
        <div className="flex  items-center justify-center flex-col gap-2">
          <h1 className="font-extrabold tracking-wider text-[3rem] w-2/3 text-center underline underline-offset-4">
            Frequently Asked Question's
          </h1>
          <p className="w-1/2 font-serif text-center ">
            Do You need some help with something or do you have questions on
            some products
          </p>
        </div>
        <div className="">
          {faqs.map((item) => (
            <Collapse items={item} bordered={false} key={item.id} />
          ))}
        </div>
      </div> */}
    </>
  );
}

export default HomePage