import { faker } from '@faker-js/faker'
import React from 'react'
import {blog} from "../../constant"
import { Pagination } from '@mui/material'



const Blog = () => {
  return (
    <>
      <div className="contact-header bg-black/50  min-h-[50vh] flex items-center w-full p-4">
       <div className="h-[20rem]  w-[40rem] m-auto flex flex-col items-center">
        <p className='px-12 text-center text-xl text-white'>Finding the motivation to work out can be challenging,
             but remember that every step you take brings you closer to your goals.
             Whether you're pushing through a tough set or just lacing up your shoes, you're investing in your future self.
              Consistency is key, and every workout, no matter how small, is a victory.</p>
              <p className='text-white italic text-xl bg-black/20 backdrop-blur-md p-2 mt-8'>By <span>
              Arnold Schwarzenegger</span> </p>
       </div>            
    </div>
    <div className="flex items-center justify-around flex-col">
       <h1 className='text-[3rem]'>Blogs</h1>
         <div className="p-2 flex flex-col   ">
         <div className="flex  items-start gap-2 p-2">
            <div className="flex">
            <img src={faker.image.avatar()} alt="" className='h-12 w-12 rounded-full' />
            </div>
            <div className="">
            <p>@{faker.person.fullName()}</p>
            <small>{blog[0].date} {blog[0].time}</small>
            </div>
          </div>
            <div className="">
              <img
               src="https://sfhealthtech.com/cdn/shop/articles/10_Ways_Rowing_Machines_Can_Benefit_Your_Health_1080x.webp?v=1715158879"
                alt="" width={800} />
            </div>
            <div className="text-xl">{blog[0].title}</div>
         </div>
         <BlogCard/>
        </div>

    <div className="flex items-center justify-center mt-12">
    <Pagination count={blog.length} variant="outlined" color="primary" />    
    </div>
    </>
  )
}

export const BlogCard = ({start=0, end=0})=>{
  <div className="flex flex-wrap items-center justify-center">
  {
    blog.slice(start , end).map((item)=>(
        <>
      <div key={item.time} className="m-4 flex flex-col justify-center w-[30rem] hover:scale-105 duration-300    ">
      <div className="flex  items-start gap-2 p-2">
         <div className="flex">
         <img src={faker.image.avatar()} alt="" className='h-12 w-12 rounded-full' />
         </div>
         <div className="">
         <p>@{item.author_name}</p>
         <small>{item.date} {item.time}</small>
         </div>
       </div>
         <div className="">
           <img
            src="https://sfhealthtech.com/cdn/shop/articles/10_Ways_Rowing_Machines_Can_Benefit_Your_Health_1080x.webp?v=1715158879"
             alt="" width={500} />
         </div>
         <div className="text-xl">{item.title}</div>
      </div>
        </>
    ))
  }
 </div>
}
export default Blog
