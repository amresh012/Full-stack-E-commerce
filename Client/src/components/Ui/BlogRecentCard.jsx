import React from "react";
import moment from 'moment';
import { Link } from "react-router-dom";

const BlogRecentCard = ({blog}) => {
  const {_id, title, content, image, createdAt} = blog;
  return (
    <Link to={`${_id}`} state={{title, image, content, createdAt}} className="w-full"><div className="flex w-full h-[10rem] md:w-[28rem] gap-x-1">
      <img loading="lazy" src={image} className="h-[inherit] py-1 rounded-md w-[40%] object-cover" />
      <div className="h-[inherit] w-[50%] bg-[#02a2440] px-4 py-2">
        <p className="text-lg font-medium text-[#ababab]">{moment(createdAt).format('DD-MM-yyyy')}</p>
        <p className="text-xl font-bold text-[#0a2440]">
          {title.substr(0,50) || (title.length > 50 && '...')}
        </p>
      </div>
    </div></Link>
  );
};

export default BlogRecentCard;
