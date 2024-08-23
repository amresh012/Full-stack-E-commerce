import React from 'react';
import img from '../../assets/about-2.jpg';

const BlogCard = () => {
  return (
    <div className='my-4 w-full md:w-[44rem]'>
        <img loading="lazy" src={img} className='w-full object-cover h-[15rem] sm:h-[25rem]' />
        <div>
            <p className='mt-5 mb-3 text-xl'><span className='font-bold text-[#0a2440]'>By Mayank Jha</span><span className='mx-4 text-[#ababab] font-medium'>|</span><span className='font-medium text-[#ababab]'>Aug 22, 2024</span></p>
            <p className='text-4xl font-bold text-[#0a2440] my-2'>The Best are European Materls Direct</p>
            <p className='text-lg font-light'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit officiis est et illo laudantium eveniet provident vitae voluptates sed neque, aliquam laboriosam vel enim, minima, consequatur totam nobis. Vitae eaque saepe recusandae maiores il</p>
            <div>
            <button className="mt-5 hover:bg-white text-lg px-14 py-3 rounded-sm bg-[#144170] text-white duration-500 ease-in-out hover:text-[#0a2440]">Read</button>
            </div>
        </div>
    </div>
  )
}

export default BlogCard