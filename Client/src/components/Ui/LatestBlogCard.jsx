import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const LatestBlogCard = ({ blog }) => {
  const { image, _id, title, content, createdAt } = blog;
  return (
    <div className="my-4 w-auto">
      <img
        loading="lazy"
        src={image}
        className="w-full object-cover h-[15rem]"
      />
      <div>
        <p className="mt-5 mb-3 text-lg">
          {/* <span className="font-bold text-[#0a2440]">By Mayank Jha</span>
          <span className="mx-4 text-[#ababab] font-medium">|</span> */}
          <span className="font-medium text-[#ababab]">
            {moment(createdAt).format("DD-MM-yyyy")}
          </span>
        </p>
        <p className="text-2xl font-bold text-[#0a2440] my-1">
          {/* {title.substr(0, 50) + (title.length > 50 && "...")} */}
          {title.substr(0,50).trim()}{(title.length > 50 ? '...':'')}

        </p>
        <div>
          <Link to={`/blog/${_id}`} state={{ title, image, content, createdAt }}>
            <button className="mt-1 hover:bg-white text-base px-12 py-2 rounded-sm bg-[#144170] text-white duration-500 ease-in-out hover:text-[#0a2440]">
              Read
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogCard;
