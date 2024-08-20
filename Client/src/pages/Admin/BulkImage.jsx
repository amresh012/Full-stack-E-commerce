import { Button } from '@mui/material';
// import React, { useState } from 'react'
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { base_url } from '../../Utils/baseUrl';
import { FaCopy } from 'react-icons/fa';
import BasicTable from '../../components/AdminComponents/BasicTable';
import {toast, Toaster} from "react-hot-toast"
import {useFormik} from "formik"
import axios from "axios"


const BulkImage = () => {
    const { Dragger } = Upload;
    
    // function for copy to clipboard image url
    function copyToClipboard(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
    
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
    
      document.body.appendChild(textarea);
    
      textarea.select();
      document.execCommand('copy');
    
      document.body.removeChild(textarea);
    }

    const {values ,setFieldValue,handleSubmit} = useFormik({
      initialValues: {
        name:"",
        url:""
      },
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await axios.post(`${base_url}images`, values);
          console.log(values);
          if (response.data.error) {
            throw new Error(response.data.error);
          } else {
            toast.success("Image Uploaded Successfully");
          }
        } catch (error) {
          console.log(error.message)
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      },
    })

// image drager props

    const props = {
      name: "file",
      multiple: true,
      action: `${base_url}uploads`,
      onSubmit(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file.response, info.fileList);
          setFieldValue("url", info.file.response);
          setFieldValue("name",info.file.name)
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        handleImgUpload( e.dataTransfer.files);
        // console.log("Dropped Image ", e.dataTransfer.files)
      },
    };
  
   
  
  // column
  const columns = [
    {
      header: "ID",
      accessorKey: "_id",
    },
    {
      header: "Preview",
      accessorKey: "image",
    },
    {
      header: "Image Name",
      accessorKey: "_id",
      cell: (data) => <div className="p-2"><img className="m-" src={data?.row?.url} alt={data?.row?.name} /></div>
    },
    {
      header: "Url",
      accessorKey: "url",
    },
    {
      header: "Action",
      cell:({row})=> <button onClick={() => copyToClipboard(row.url)}><FaCopy fontSize={30} /></button>
    },
  ];

  
  return (
    <>
    <Toaster/>
    <div className=" rounded-md shadow-md gap-12 h-auto mt-24 flex flex-col items-center justify-around lg:mx-24 p-4">
      <div className="space-y-4 w-full m-auto">
        <div className='border-2 shadow-md flex items-center justify-normal  rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Add Images</h1>
        </div>
    </div>
    {/*  */}
       <form onSubmit={handleSubmit} className='flex flex-col w-full gap-12'>
       <div className="relative cursor-pointer h-full">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </div>

        
        <div className="flex items-center justify-center w-full">
          <button type="submit" className='bg-[#038CCC] w-2/4 p-2 text-white rounded-md active:shadow-md'>Upload Images</button>
        </div>
       </form>
      </div>
      <div className="flex flex-col w-full p-2 gap-5">
        <div className="flex justify-between px-12">
          <h1 className="text-4xl">Previous Uploaded Files</h1>
        </div>
        {/* upload list */}
        <div className="w-full"><BasicTable columns={columns} data={[]}/></div>
      </div>
    </div>
    </>
  );
}

export default BulkImage
