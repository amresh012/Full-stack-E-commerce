import React from "react";
import moment from 'moment';

const BlogRecentCard = ({blog}) => {
  const {title, image, createdAt} = blog;
  return (
    <div className="flex w-full h-[10rem] md:w-[28rem] p-2  overflow-clip  ">
      <img loading="lazy" src={image} className="h-[inherit] rounded-md w-[40%] object-cover" />
      <div className="h-[inherit] flex-1 bg-[#02a2440] px-4 py-2">
        <p className="text-lg font-medium text-[#ababab]">{moment(createdAt).format('DD-MM-yyyy')}</p>
        <p className="text-xl font-bold text-[#0a2440]">
          {title.substr(0,50) || (title.length > 50 && '...')}
        </p>
      </div>
    </div>
  );
};

export default BlogRecentCard;
