import React from 'react'
import {Link} from "react-router-dom"
const About = () => {
  return (
    <>
      <div className=" p-4 flex w-full  justify-around items-center">
        <div className="left-content w-1/2 space-y-4 ">
          <h1 className="text-4xl font-bold border-b-4 w-fit border-blue-500">
            About Us
          </h1>
          <p className="leading-8 tracking-wider">
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
          <div className=" flex gap-2 items-center ">
            <span className="italic  text-zinc-600">For More Information</span>
            <Link to="/contact">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2024/5/416052397/WU/OB/CL/62272036/kfs-map-500x500.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default About
