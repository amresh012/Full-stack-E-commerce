import { Autocomplete ,TextField } from '@mui/material'
// import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import {gym_equipment} from "../../constant"
import {useFormik} from "formik"
import axios from 'axios'
import { base_url } from '../../Utils/baseUrl';
import { toast, Toaster } from 'react-hot-toast';
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const AddProduct = () => {
    const { Dragger } = Upload;
    const props = {
      name: "file",
      multiple: true,
      action: `https://images.deepmart.shop/upload`,
      onChange(info) {
        // console.log(info);
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name.slice(0,10)} file uploaded  successfully.`);
          setFieldValue(
            "images",
            info.fileList.map((file) => file.response)
          );
        } else if (status === "error") {
          message.error(`${info.file.name.slice(0,20)} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    };

   const {values , setFieldValue, handleSubmit , handleChange} = useFormik({
    initialValues: {
       name: "",
       images:[],
        price: "",
        category:"",
        subcategory:"",
        itemCode:"",
        hsnCode:"",
        perpiece:"",
        measurment:"",
        quantity:+"",
        description:"",
        Individual_discount:"",
        corporate_discount:"",
        mindiscription:"",
    },
    onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await axios.post(`${base_url}product/add`, values,);
          console.log(values)
          if(response.data.error){
             throw new Error(response.data.error)
          }
          else{
            toast.success('Product Added Successfully')
          }
        } catch (error) {
        //    console.log(error.message)
           toast.error(error.message)
        } finally {
          setSubmitting(false);
        }
      }

   })
  // upload image
  // const props = {
  //   name: "file",
  //   multiple: true,
  //   action: `${base_url}uploads`,
  //   onChange(info) {
  //     // console.log(info);
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name.slice(0,10)} file uploaded  successfully.`);
  //       setFieldValue(
  //         "images",
  //         info.fileList.map((file) => console.log(file.response[0]))
  //       );
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };
  


  return (
    <>
      <Toaster />
      <div className="border-2 mt-24 rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around lg:mx-24 p-6">
        <div className="text-3xl font-bold ">
          <Link to="/admin/product-list">Add Products</Link>
        </div>
        {/* Product add */}
        <form onSubmit={handleSubmit} className="w-full space-y-12">
          {/* section-1 */}
          <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Name</label>
              <input
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter product name"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Category</label>
              <input
                type="text"
                value={values.category}
                id="category"
                onChange={handleChange}
                className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
                placeholder="enter category"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Sub category</label>
              <input
                type="text"
                value={values.subcategory}
                id="subcategory"
                onChange={handleChange}
                className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
                placeholder="enter subcategory"
              />
            </div>
          </div>
          {/* section-2 */}
          <div className="flex gap-12 items-center justify-around">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Price</label>
              <input
                type="text"
                id="price"
                value={values.price}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none px-2 placeholder:px-2 "
                placeholder="enter product price"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Price Per Pices</label>
              <input
                type="text"
                id="perpiece"
                value={values.perpiece}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter product price"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Qunatity</label>
              <input
                type="text"
                id="quantity"
                value={values.quantity}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter quantity"
              />
            </div>
          </div>
          {/* section-3 */}
          <div className="flex gap-12 items-center justify-around">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Item Code</label>
              <input
                value={values.itemCode}
                onChange={handleChange}
                type="number"
                id="itemCode"
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter Item Code"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">HSN Code</label>
              <input
                value={values.hsnCode}
                onChange={handleChange}
                type="number"
                id="hsnCode"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter HSN Code"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Unit Of Measurement</label>
              <input
                value={values.measurment}
                onChange={handleChange}
                id="measurment"
                type="text"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter Unit Of Measurement"
              />
            </div>
          </div>
          {/* section-3 */}
          <div className="flex gap-12 items-center justify-around">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Corporate Discount</label>
              <input
                type="text"
                id="corporateDiscount"
                value={values.corporateDiscount}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter Corporate Discount"
              />
            </div>
            <div className="Product Varant w-full">
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Select Product Variant</label>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={gym_equipment}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Variant" />
                  )}
                />
              </div>
            </div>
          </div>
          {/* section-4 */}
          {/* section-5 */}
          <div className="space-y-2">
            <label htmlFor="">Product Description</label>
            <TextField
              value={values.mindiscription}
              onChange={handleChange}
              id="mindiscription"
              label="Description"
              variant="outlined"
              className="w-full"
            />
          </div>
          {/* section-6 */}
          <div className="space-y-4">
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
            <div className="border-2 cursor-pointer  text-center border-blue-500 text-blue-500 px-12 py-2 hover:text-white  duration-300 hover:bg-blue-400">
              <button type="submit">Add Product</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct
