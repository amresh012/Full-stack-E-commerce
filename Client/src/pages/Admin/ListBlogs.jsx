/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/AdminComponents/BasicTable";
import { base_url } from "../../Utils/baseUrl";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { List } from "@mui/material";
import { MdBlockFlipped } from "react-icons/md";
import { Space, Switch } from "antd";
import { CgUnblock } from "react-icons/cg";
import { config } from "../../Utils/axiosConfig";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BasicModal from "../../components/Models/Model";
import Loader from "../../components/reusablesUI/Loader";
import { IoCloseCircleOutline } from "react-icons/io5";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: null,
    image: null,
    content: null,
    date: null,
  });
  const [open, setOpen] = useState(false);
  const [fetchingBlog, setfetchingBlog] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{+id + 1}</span>;
      },
    },
    {
      header: "image",
      accessorKey: "image",
      cell: ({ row }) => {
        return (
          <img
            src={row.original.image}
            alt=""
            className="h-12 w-12 object-cover"
          />
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
      invertSorting: true,
      cell: ({ row }) => {
        return row.original.title.length > 50
          ? row.original.title.substr(0, 50) + "..."
          : row.original.title;
      },
    },
    {
      header: "Content",
      accessorKey: "content",
      cell: ({ row }) => {
        return row.original.content.length > 50
          ? row.original.content.substr(0, 50) + "..."
          : row.original.content;
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return moment(row.original.createdAt).format("DD-MM-YYYY");
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => deleteBlog(row.original._id)}
              className="bg-red-200 p-2 rounded-md"
            >
              <FaTrash className="text-red-500" />
            </div>
            <div
              onClick={() => fetchBlogDetails(row.original._id)}
              className="bg-blue-200 p-2 rounded-md"
            >
              <FaEye className="text-blue-500 " />
            </div>
            <div
              onClick={() => navigate(`/admin/blog-edit/${row.original._id}`)}
              className="bg-black/20 p-2 rounded-md hover:shadow-md"
            >
              <FaPen className="text-black " />
            </div>
          </List>
        );
      },
    },
  ];

  const fetchBlogDetails = async (id) => {
    const blog = blogs.filter(blog => blog._id === id);
    setBlogDetails({
        title: blog[0].title,
        image: blog[0].image,
        content: blog[0].content,
        date: blog[0].date,
    });
    setOpen(true);
  };

  const deleteBlog = async (id) => {
    try{
        const response = await fetch(`${base_url}blog/del`, {
            method: 'POST',
            ...config,
            body: JSON.stringify({
                _id: id
            })
        });
        const data = await response.json();
        if(!data.success){
            throw new Error(data.message);
        }
        toast.success(data.message);
        setReload(prev => !prev);
    }
    catch(error){
        toast.error(error.message);
    }
  }

  useEffect(() => {
    const FetchBlogs = async () => {
      let response = await fetch(`${base_url}blog/`);
      let data = await response.json();
      console.log(data);
      setBlogs(data);
      setIsLoading(false);
    };
    FetchBlogs();
  }, [reload]);

  return (
    <div>
      <Toaster />
      {open && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[50%] max-h-[35rem] bg-white p-5 rounded-md overflow-auto"
          style={{ boxShadow: "0 0 4px 1px #c3bcbc" }}
        >
          <div
            onClick={() => {
              setOpen(false);
              setBlogDetails({
                title: null,
                image: null,
                content: null,
                date: null,
              });
            }}
            className="flex justify-between text-3xl"
          >
            <h1 className="font-bold text-3xl">User Details</h1>
            <div className="hover:text-red-500">
              <IoCloseCircleOutline />
            </div>
          </div>
          <div>
            {!fetchingBlog && (
              <div className="mt-3 text-lg">
                <div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Title:</span>
                    <span>{blogDetails?.title}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Content:</span>
                    <span>{blogDetails?.content}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold">Date:</span>
                    <span>
                      {moment(blogDetails?.date).format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold">Image:</span>
                    <img
                      className="mt-3 w-[20rem]"
                      src={blogDetails?.image}
                      alt="blog image"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className=" border-2 mt-10 mx-12 rounded-md shadow-md gap-4 h-auto flex flex-col items-center justify-around p-6 overflow-auto">
        <div className="w-full">
          <h1 className="text-2xl font-bold uppercase">List Of Blogs on KFS</h1>
        </div>
      </div>
      <div className="m-12 shadow-md border-2 rounded-md p-2">
        <BasicTable columns={columns} data={blogs} />
      </div>
    </div>
  );
};

export default ListBlogs;
