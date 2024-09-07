//*********************************************************************
//fully working
// *************************************************************************
import { Button } from '@mui/material'
// import React from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import { message, Upload } from "antd";
import { base_url } from "../../Utils/baseUrl";


const AddBulkProduct = () => {

  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    accept:".xls,.xlsx ,.csv" ,
    action: `${base_url}bulk`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
       
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // 
    },
  };
 
  return (
    <div className="flex mt-24 flex-col w-full h-screen items-center justify-start gap-12 px-12">
      <h1 className="text-4xl text-center">
        Upload Products in bulk using Excel file
      </h1>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <div className=" flex items-center justify-center text-green-800 ">
            <SiMicrosoftexcel size={80} />
         </div>
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint"> 
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <p className="w-1/2 text-center text-blue-400">
        Make sure before upload your excel file that your excel is written in
        right format. if it not fomat in correct way it will not uplaoded !!
        Here is reference excel file download it and start uploading
      </p>
      <span className="text-red-500">
        ** Make a comma sepration in image field in excel to add multiple mages
      </span>
      <a href="#">
        <Button sx={{backgroundColor: "#0a2444"}} variant="contained">Download Excel</Button>
      </a>
    </div>
  );
}

export default AddBulkProduct
