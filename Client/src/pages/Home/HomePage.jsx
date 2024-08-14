import React from 'react'
import {Spin,Spin2} from "../../assets/images"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { range_of_products} from "../../constant"
import CategTab from '../../components/TabComp/Antd';
const HomePage = () => {
  return (
    <div>
      <div className="hero h-[100vh] flex items-center justify-center">
        <h1>HERO GOES HERE</h1>
      </div>


      {/* Shop by Category*/}
      <div className="h-[50vh] space-y-4 ">
          <div className="items-center justify-center px-12 py-4 font-bold text-3xl flex flex-col relative  text-center">
            <h1> <span className=''>SHOP</span> BY CATEGORY</h1>
            {/* <span className='w-48 bg-blue-500 h-1'></span> */}
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center px-12">
            {
              [...Array(5)].map(()=>(
                <div className="card h-[15rem] w-[15rem] border-2 rounded-md">
                  <div className="img-container h-full">
                  <Carousel showThumbs={false} dynamicHeight={true} autoplay={true} showIndicators={false}>
                   <img src={Spin} alt="" />
                   <img src={Spin2} alt="" />
                 </Carousel>
                  </div>
                  <div className="detail bg-black/40 h-full w-full p-2 flex flex-col justify-end gap-2 text-white cursor-pointer">
                    <h1 className='font-bold text-2xl'>PRODUCT NAME</h1>
                    <p className="desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, perferendis incidunt ullam asperiores alias ab suscipit officiis 
                    </p>
                    <button className="bg-blue-500 text-white p-2 rounded-md">VIEW</button>
                  </div>
                </div>
              ))
            }
          </div>
      </div>


      {/* range of product */}
      <div className="h-[100vh]">
      <div className="items-center justify-center px-12 py-4 font-bold text-3xl flex flex-col relative  text-center">
            <h1 className='text-[3rem]'> <span className=''>Explore</span> the Range of product category</h1>
            {/* <span className='w-1/4 bg-blue-500 h-1'></span> */}
            <p className='text-base center pt-12 font-medium w-1/2 leading-8 tracking-wider'>EXPLORE THE COMPLETE RANGE OF PRODUCTS FOR COMMERCIAL & HOME GYMS ALL OVER INDIA. AVAILABLE FROM LEADING FITNESS EQUIPMENT SUPPLIERS; ENERGIE FITNESS STORE.</p>
      </div>
      {/*  */}
      <div className="flex justify-around gap-2 p-4 items-center">
        {
         range_of_products.map((item)=>(
            <div className="card h-[25rem] w-[25rem] border-2 rounded-md">
            <div className="img-container h-full">
            <Carousel showThumbs={false} dynamicHeight={true} autoplay={true} showIndicators={false}>
             <img src={Spin} alt="" />
             <img src={Spin2} alt="" />
           </Carousel>
            </div>
            <div className="detail detail-range bg-black/40 h-fit w-full p-2 flex flex-col justify-end gap-2 text-white cursor-pointer">
                  <h1 className='font-bold text-2xl'>{item.label}</h1>
                  <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, perferendis incidunt ullam asperiores alias ab suscipit officiis 
                  </p>
                  <button className="bg-blue-500 text-white p-2 rounded-md">VIEW</button>
            </div>
          </div>
          ))
        }
      </div>
      </div>

      {/* new Arrivals */}
      <div className="h-[100vh]">
      <div className="items-center justify-center px-12 py-4 font-bold text-3xl flex flex-col relative  text-center">
            <h1 className='text-[3rem]'> <span className=''>New </span>Arrivals</h1>
            {/* <span className='w-1/4 bg-blue-500 h-1'></span> */}
      </div>
      <div className="flex justify-around gap-2 p-4 items-center">
        {
         range_of_products.slice(0,3).map((item)=>(
            <div className="card h-[25rem] w-[25rem] border-2 rounded-md">
            <div className="img-container h-full">
            <Carousel showThumbs={false} dynamicHeight={true} autoplay={true} showIndicators={false}>
             <img src={Spin} alt="" />
             <img src={Spin2} alt="" />
           </Carousel>
            </div>
            <div className="detail detail-range bg-black/40 h-fit w-full p-2 flex flex-col justify-end gap-2 text-white cursor-pointer">
                  <h1 className='font-bold text-2xl'>{item.label}</h1>
                  <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, perferendis incidunt ullam asperiores alias ab suscipit officiis 
                  </p>
                  <button className="bg-blue-500 text-white p-2 rounded-md">VIEW</button>
            </div>
          </div>
          ))
        }
      </div>
      </div>

      {/* tab view */}
      <div className="h-screen">
        <CategTab dataArr={range_of_products}/>
      </div>
    </div>
  )
}

export default HomePage


