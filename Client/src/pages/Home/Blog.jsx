import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { blog } from "../../constant";
import { Pagination } from "@mui/material";
import BlogCard from "../../components/Ui/BlogCard";
import BlogRecentCard from "../../components/Ui/BlogRecentCard";
import { toast, Toaster } from "react-hot-toast";
import {base_url} from '../../Utils/baseUrl';
import { config } from "../../Utils/axiosConfig";
import axios from "axios";

const Blog = ({ start, end }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  // popular tags
  const popularTags = [
    {
      id: 1,
      name: "Weightlifting",
      count: 25,
    },
    {
      id: 2,
      name: "Fitness Motivation",
      count: 30,
    },
    {
      id: 3,
      name: "Gym Workouts",
      count: 28,
    },
    {
      id: 4,
      name: "Bodybuilding",
      count: 22,
    },
    {
      id: 5,
      name: "Home Workout Routines",
      count: 18,
    },
    {
      id: 6,
      name: "Fitness Nutrition",
      count: 20,
    },
    {
      id: 7,
      name: "Treadmill Workouts",
      count: 15,
    },
    {
      id: 8,
      name: "Yoga for Beginners",
      count: 12,
    },
    {
      id: 9,
      name: "Gym Equipment Reviews",
      count: 10,
    },
    {
      id: 10,
      name: "CrossFit Training",
      count: 8,
    },
    {
      id: 11,
      name: "Fitness for Women",
      count: 6,
    },
    {
      id: 12,
      name: "Gym Membership Deals",
      count: 4,
    },
  ];

  const allBlogs = async () => {
    try {
      const response = await axios.get(base_url+'blog', config);
      const data = response.data;
      setBlogs(data);
      setFilteredBlogs(data.slice(0,3));
      if(data.length === 0)  {
        setTotalPages(0);
      }
      else{
        const pages = Math.ceil(data.length / 3);
        setTotalPages(pages);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page, (page-1)*3)
    const results = blogs.slice((page-1)*3, (page-1)*3+3);
    console.log(results)
    setFilteredBlogs(results);
  };

  useEffect(()=>{
    allBlogs();
  }, [])

  useEffect(()=>{
    if(searchKey.trim() === ''){
      const results = blogs.slice((currentPage-1)*3, (currentPage-1)*3+3);
      setFilteredBlogs(results);
    }
    else{
      const results = blogs.filter(blog => {
        return (
          blog.title.toLowerCase().includes(searchKey.toLowerCase().trim()) ||
          blog.content.toLowerCase().includes(searchKey.toLowerCase().trim())
        )
      })
      setFilteredBlogs(results);
    }
  }, [searchKey])

  return (
    <>
      <Toaster />
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

        <div className="mt-10 flex flex-wrap gap-8 w-[80rem]  justify-center px-4 md:px-0">
          <div className="">
            {filteredBlogs.map(blog => <BlogCard blog={blog} />)}

            <div className="flex gap-x-1 w-full justify-center mt-6">
              {Array(totalPages)
                .fill(0)
                .map((_, ind) => {
                  return (
                    <div
                      className="text-base font-thin h-[2rem] w-[2rem] flex items-center justify-center rounded-full cursor-pointer"
                      key={ind}
                      style={{
                        backgroundColor: `${
                          currentPage === ind + 1 ? "white" : "#144170"
                        }`,
                        color: `${
                          currentPage === ind + 1 ? "#144170" : "white"
                        }`,
                        border: `${
                          currentPage === ind + 1 ? "1px solid #144170" : "none"
                        }`,
                      }}
                      onClick={() => handlePageChange(ind + 1)}
                    >
                      {ind + 1}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex h-full flex-col gap-4 w-[30rem] items-center p-12">
            <div className="searchbar w-full rounded-full border-2   flex">
              <input
                type="search"
                className="search h-12 outline-none  rounded-l-full w-full px-4 placeholder:px-2"
                placeholder="search for favourite blogs..."
                value={searchKey}
                onChange={(e)=>setSearchKey(e.target.value)}
              />
              <button className="uppercase bg-[#0A2440] rounded-r-full text-white p-2">
                search
              </button>
            </div>
            <div className="bg-gray-200/40 h-fit p-4 rounded-md shadow-sm m-4">
              <h1 className="mt-2 uppercase text-center  text-[#0a2440] text-2xl font-bold">
                Recent Posts
              </h1>
              <div className="mx-auto mt-2 rounded-md h-[6px] w-[70px] bg-[#0a2440]"></div>
              <div className="mt-5 space-y-1">
                {blogs.slice(0,3).map(blog => <BlogRecentCard blog={blog} />)}
              </div>
            </div>
            {/* popular tags */}
            <div className="popular-tags bg-gray-200/40 h-fit p-4 rounded-md shadow-sm">
              <h1 className="mt-2 uppercase text-center  text-[#0a2440] text-2xl font-bold">
                Popular Tags
              </h1>
              <div className="mx-auto mt-2 rounded-md h-[6px] w-[70px] bg-[#0a2440]"></div>
              <div className="tags flex flex-wrap  gap-2 mt-5">
                {popularTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="bg-[#0A2440] text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                  >
                    {tag.name} ({tag.count})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center mt-12">
        <Pagination count={blog.length} variant="outlined" color="primary" />
      </div> */}
    </>
  );
};

export default Blog;
