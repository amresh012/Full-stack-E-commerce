import React from 'react'
import {useParams}from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'; 
import { faker } from '@faker-js/faker';
import { Avatar } from 'antd';
import moment from 'moment';
const imageCollection =  
[
      {
        id:0,
        image:"https://picsum.photos/200/200",
      },
      {
        id:0,
        image:"https://picsum.photos/200/200",
      },
      {
        id:0,
        image:"https://picsum.photos/100/100",
      },
      {
        id:0,
        image:"https://picsum.photos/100/100",
      }
]

const BlogView = () => {
 const {id} = useParams()
  return (
  <>
   <div className="contact-header min-h-[50vh] bg-black/20 flex items-center w-full p-4">
                <div className="lg:h-32 flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
                    <h1>KFS Fitness Blogs</h1>
                    <p className=' capitalize lg:text-base text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, magnam accusamus sapiente quae delectus!</p>
                </div>
            </div>
  <div className="main-blog_wrapper flex gap-2 items-center justify-center mt-12  lg:flex-row sm:flex-col-reverse p-2">
     <div className="box-2  w-1/2 h-full">
        <div className="image ">
          <Carousel 
          renderIndicator={false} 
          autoPlay={true} infiniteLoop={true} 
          showStatus={false}
          showArrows={false}
          dynamicHeight={true}
          showThumbs={false}
          >
            {
              imageCollection.map((item)=>(
                <img src={item.image} alt=""  key={item.id} className='h-[20rem] object-cover'/>
              ))
            }
          </Carousel>
        </div>
        <div className="blog-detail p-2">
            <div className="flex flex-wrap justify-start items-center gap-4">
                <div className="blog-by flex items-center gap-2">
                <Avatar src={<img src={faker.image.avatar()} alt="avatar" />} />
                    <p className="username">{faker.person.firstName()}</p>
                </div>
                <span>|</span>
                <div className="date-time">
                    <p className="">{moment().format('ll')}</p>
                </div>
                <span>|</span>
                <div className="tag">
                    <p className=""></p>
                </div>
            </div>
            <div className="h1 ">
                <h1 className='blog_title text-2xl font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                <div className="blog-desc">
                    {
                      [...Array(3)].map(()=>(
                        <p className="tracking-wider">{faker.lorem.paragraphs()}</p>
                      ))
                    }
                </div>
            </div>
        </div>
     </div>
     <div className="box-2 w-[30rem] bg-blue-300 h-full"></div>
  </div>
  </>
  )
}

export default BlogView
