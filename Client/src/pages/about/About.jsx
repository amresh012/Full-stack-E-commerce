import React from "react";
import { Link } from "react-router-dom";
import about1 from "../../assets/about-1.jpg";
import about2 from "../../assets/about-2.jpg";
import about3 from "../../assets/about-3.jpg";
import about4 from "../../assets/about-4.jpg";
import { GiStrong } from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiMountainCave } from "react-icons/gi";

const About = () => {
  return (
    <>
      <div className="relative">
        <div className="about-header min-h-[50vh] bg-black/20 flex items-center w-full p-4">
          <div className="lg:h-32 flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
            <h1>KFS Fitness About Us</h1>
            <p className=" capitalize lg:text-base text-xs">
            At KFS Fitness, we provide top-quality fitness equipment and expert support to help you achieve your health and wellness goals.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 p-4 flex w-full  justify-around items-center">
        <div className="left-content w-[90%]">
          <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
            About Us
          </h1>
          <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440]"></div>

          <p className="mt-10 leading-8 tracking-wider font-light text-lg">
            KFS Fitness has been a trusted name in the fitness industry for over
            a decade. With 10 years of experience under their belt, they have
            built a reputation for providing high-quality gym equipment and
            exceptional customer service.Over the years, KFS Fitness has grown
            and expanded their offerings to meet the evolving needs of their
            customers. We have a wide range of equipment options, from cardio
            machines and strength training equipment to fitness accessories and
            wellness products. Our extensive selection allows us to cater to a
            diverse customer base, including individuals, gyms, and fitness
            centres. One of the reasons for the success is their commitment to
            quality. KFS Fitness R&D team ensuring that all products meet high
            standards of durability, safety, and effectiveness. They also
            prioritize ongoing maintenance and support to ensure that their
            equipment remains in excellent working condition, minimizing
            downtime and maximizing customer satisfaction.But it’s not just the
            equipment that sets KFS Fitness apart – it’s also their customer
            service. Their knowledgeable staff is always available to answer
            questions, provide guidance, and offer support throughout the entire
            customer journey. From helping customers choose the right equipment
            for their needs to providing installation and maintenance services,
            KFS Fitness goes above and beyond to ensure that their customers are
            satisfied.Looking ahead, KFS Fitness is committed to continuing to
            innovate and provide cutting-edge solutions for their customers.
            With their wealth of experience and dedication to quality and
            service, they are well-positioned to thrive in the competitive
            fitness industry for many years to come.
          </p>
          <div className="flex gap-2 items-center mt-5 mb-10">
            <span className="italic  text-zinc-600">For More Information</span>
            <Link to="/contact">
              <button className="hover:bg-white text-lg px-8 py-3 rounded-sm bg-[#144170] text-white duration-500 ease-in-out hover:text-[#144170] hover:border">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 px-4 py-28 flex flex-wrap justify-center w-full bg-[#144170]">
        <div className="w-full">
          <div className="w-full sm:w-[90%] mx-auto lg:h-[40rem] flex flex-col lg:flex-row">
            <img loading="lazy" className="object-cover object-top h-[30rem] lg:h-[inherit] lg:w-[50%]" src={about3} />
            <div className="py-10 lg:py-0 flex-1 h-[inherit] bg-white flex flex-col items-center justify-center px-10">
              <div>
                <GoGoal size={100} color="#ff528a" />
              </div>
              <div className="mt-6 mb-1 uppercase text-4xl font-bold text-[#144170]">Home Fitness</div>
              <div className="mt-1 text-lg font-light">
              Whether you're looking to improve your cardiovascular health, build muscle strength, or just stay active, there are many types of home fitness equipment that can help you achieve your goals.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full sm:w-[90%] mx-auto lg:h-[40rem] flex flex-col-reverse lg:flex-row">
          <div className="py-10 lg:py-0 flex-1 h-[inherit] bg-white flex flex-col items-center justify-center px-10">
              <div>
                <GiMountainCave size={100} color="#ff528a" />
              </div>
              <div className="mt-6 mb-1 uppercase text-4xl font-bold text-[#144170]">Commercial Fitness</div>
              <div className="mt-1 text-lg font-light">
              Our commercial fitness equipment is designed for high-traffic gyms and fitness centers, providing durability, functionality, and performance.
              </div>
            </div>
            <img loading="lazy" className="object-cover object-center h-[30rem] lg:h-[inherit] lg:w-[50%]" src={about4} />
          </div>
        </div>
      </div>

      <div className="mt-16 mb-16 px-4 flex flex-wrap gap-x-5 gap-y-5 justify-center">
        <div
          className="hover:border hover:bg-white hover:scale-105 ease-in-out duration-500 w-[600px] h-[200px] flex"
          style={{ boxShadow: "0 10px 38px 0 rgba(0,0,0,.11)" }}
        >
          <div className="h-[inherit] flex-1 rounded-sm flex-row justify-center items-center px-4 flex flex-col sm:flex-row">
            <div className="sm:flex-1">
              <p className="text-3xl sm:text-5xl font-bold text-[#144170]">150+</p>
              <p className="text-xl sm:text-3xl font-bold mt-3 text-[#00000063]">
                Gym Setup
              </p>
            </div>
            <div className="pr-5">
              <GiStrong size={60} color="#ff528a" />
            </div>
          </div>
          <div className="w-[40%]">
            <img loading="lazy" src={about1} className="object-cover h-[200px] w-full" />
          </div>
        </div>
        <div
          className="hover:border hover:bg-white hover:scale-105 ease-in-out duration-500 w-[600px] h-[200px] flex"
          style={{ boxShadow: "0 10px 38px 0 rgba(0,0,0,.11)" }}
        >
          <div className="h-[inherit] flex-1 rounded-sm flex-row justify-center items-center px-4 flex flex-col sm:flex-row">
            <div className="sm:flex-1">
              <p className="text-3xl sm:text-5xl font-bold text-[#144170]">5K+</p>
              <p className="text-xl sm:text-3xl font-bold mt-3 text-[#00000063]">
                Equipments Sold
              </p>
            </div>
            <div className="pr-5">
              <FaDumbbell size={60} color="#ff528a" />
            </div>
          </div>
          <div className="w-[40%]">
            <img loading="lazy" src={about2} className="object-cover h-[200px] w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
