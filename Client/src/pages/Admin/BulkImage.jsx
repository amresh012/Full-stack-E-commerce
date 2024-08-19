import { Button } from '@mui/material';
// import React, { useState } from 'react'
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { base_url } from '../../Utils/baseUrl';
import { FaCopy } from 'react-icons/fa';
import BasicTable from '../../components/AdminComponents/BasicTable';

const BulkImage = () => {
    
    const { Dragger } = Upload;
    const props = {
      name: "file",
      multiple: true,
      action: `${base_url}images`,
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file.response, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    };
    // useEffect(() => {
    //   const fetchImages = async () => {
    //     let response = await fetch(`${base_url}images`);
    //     let data = await response.json();
    //     setImagData(data);
    //   };
    //   fetchImages();
    // }, []);
    // console.log(imgdata);
  
  // column
  const columns = [
    {
      header: "ID.",
      accessorKey: "_id",
    },
    {
      header: "Preview",
      accessorKey: "image",
    },
    {
      header: "Image Name",
      accessorKey: "email",
    },
    {
      header: "Url",
      accessorKey: "url",
    },
    {
      header: "Action",
      cell:()=><FaCopy/>
    },
  ];

  
  return (
    <div className=" rounded-md shadow-md gap-12 h-auto mt-24 flex flex-col items-center justify-around lg:mx-24 p-4">
      <div className="space-y-4 w-full m-auto">
        <h1 className="text-center w-full text-4xl p-2 uppercase">
          Add Images
        </h1>
        <div className="relative cursor-pointer">
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
          <Button variant="contained" className="w-2/4">
            Add
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full p-2 gap-5">
        <div className="flex justify-between px-12">
          <h1 className="text-4xl">Previous Uploaded Files</h1>
        </div>
        {/* upload list */}
        {/* <div className="w-full"><BasicTable columns={columns}/></div> */}
      </div>
    </div>
  );
}

export default BulkImage
