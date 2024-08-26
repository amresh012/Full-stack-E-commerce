import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const BlogCard = ({blog}) => {
  const {_id, title, image, content, createdAt} = blog;

  return (
    <div className='my-4 w-full md:w-[44rem]'>
    <img loading="lazy" src={image} className='w-full object-cover h-[15rem] sm:h-[25rem]' />
    <div>
        <p className='mt-5 mb-3 text-xl'><span className='font-bold text-[#0a2440]'>By Mayank Jha</span><span className='mx-4 text-[#ababab] font-medium'>|</span><span className='font-medium text-[#ababab]'>{moment(createdAt).format('DD-MM-yyyy')}</span></p>
        <p className='text-4xl font-bold text-[#0a2440] my-2'>{title}</p>
        <p className='text-lg font-light'>{content.substr(0,100) + (content.length > 100 && '...')}</p>
        <div>
        <Link to={`${_id}`} state={{title, image, content, createdAt}}><button className="mt-5 hover:bg-white text-lg px-14 py-3 rounded-sm bg-[#144170] text-white duration-500 ease-in-out hover:text-[#0a2440]">Read</button></Link>
        </div>
    </div>
</div>
  )
}

export default BlogCard