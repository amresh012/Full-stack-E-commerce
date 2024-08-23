import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import { blog } from "../../constant";
import { Pagination } from "@mui/material";
import BlogCard from "../../components/Ui/BlogCard";
import BlogRecentCard from "../../components/Ui/BlogRecentCard";

const Blog = ({ start, end }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="blog-header min-h-[50vh] bg-black/20 flex items-center w-full p-4">
        <div className="lg:h-32 flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
          <h1>KFS Fitness Blogs</h1>
          <p className=" capitalize lg:text-base text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
            magnam accusamus sapiente quae delectus!
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around flex-col mb-16">
        <h1 className="mt-16 uppercase text-center text-[#0a2440] text-4xl font-bold">
          Blogs
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[70px] bg-[#0a2440]"></div>

        <div className="mt-10 flex gap-x-8 flex-wrap justify-center px-4 md:px-0">
          <div>
            <BlogCard />
            <BlogCard />
            <BlogCard />

            
            <div className="flex gap-x-1 w-full justify-center mt-6">
                {Array(totalPages)
                  .fill(0)
                  .map((_, ind) => {
                    return (
                      <div
                        className="text-base font-thin h-[2rem] w-[2rem] flex items-center justify-center rounded-full cursor-pointer"
                        key={ind}
                        style={{backgroundColor: `${currentPage === ind+1 ? 'white':'#144170'}`, color: `${currentPage === ind+1 ? '#144170':'white'}`, border: `${currentPage === ind+1 ? '1px solid #144170':'none'}`}}
                        onClick={() => handlePageChange(ind + 1)}
                      >
                        {ind + 1}
                      </div>
                    );
                  })}
              </div>
          </div>
          <div>
            <h1 className="mt-2 uppercase text-center text-[#0a2440] text-2xl font-bold">
              Recent Posts
            </h1>
            <div className="mx-auto mt-2 rounded-md h-[6px] w-[70px] bg-[#0a2440]"></div>
            <div className="mt-5 space-y-1">
              <BlogRecentCard />
              <BlogRecentCard />
              <BlogRecentCard />
              <BlogRecentCard />

            </div>
          </div>
        </div>

        {/* <div className="p-2 flex flex-col   ">
          <div className="flex  items-start gap-2 p-2">
            <div className="flex">
              <img
                src={faker.image.avatar()}
                alt=""
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="">
              <p>@{faker.person.fullName()}</p>
              <small>
                {blog[0].date} {blog[0].time}
              </small>
            </div>
          </div>
          <div className="">
            <img
              src="https://sfhealthtech.com/cdn/shop/articles/10_Ways_Rowing_Machines_Can_Benefit_Your_Health_1080x.webp?v=1715158879"
              alt=""
              width={800}
            />
          </div>
          <div className="text-xl">{blog[0].title}</div>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {blog.slice(start, end).map((item) => (
            <>
              <div
                key={item.time}
                className="m-4 flex flex-col justify-center w-[30rem] hover:scale-105 duration-300    "
              >
                <div className="flex  items-start gap-2 p-2">
                  <div className="flex">
                    <img
                      src={faker.image.avatar()}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <div className="">
                    <p>@{item.author_name}</p>
                    <small>
                      {item.date} {item.time}
                    </small>
                  </div>
                </div>
                <div className="">
                  <img
                    src="https://sfhealthtech.com/cdn/shop/articles/10_Ways_Rowing_Machines_Can_Benefit_Your_Health_1080x.webp?v=1715158879"
                    alt=""
                    width={500}
                  />
                </div>
                <div className="text-xl">{item.title}</div>
              </div>
            </>
          ))}
        </div> */}
      </div>

      {/* <div className="flex items-center justify-center mt-12">
        <Pagination count={blog.length} variant="outlined" color="primary" />
      </div> */}
    </>
  );
};

export default Blog;
