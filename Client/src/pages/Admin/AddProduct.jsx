import { Autocomplete, TextField } from "@mui/material";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { gym_equipment } from "../../constant";
import { useFormik } from "formik";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import { toast, Toaster } from "react-hot-toast";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const AddProduct = () => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { Dragger } = Upload;
   // Function to generate SKU
   const generateSKU = (name = '', category = '', itemCode = '') => {
    // Ensure that name and category are strings and have at least 3 characters
    const shortName = name.substring(0, 3).toUpperCase() || 'DEF';  // Default to 'DEF' if name is empty
    const shortCategory = category.substring(0, 3).toUpperCase() || 'CAT';  // Default to 'CAT' if category is empty
    const code = itemCode || '000'; // Default to '000' if itemCode is not provided
    return `${shortName}-${shortCategory}-${code}`;
  };
  // const skucode  = generateSKU()

  const props = {
    name: "file",
    multiple: true,
    action: `https://images.deepmart.shop/upload`,
    onChange(info) {
      // 
      const { status } = info.file;
      if (status !== "uploading") {
        // 
        setIsImageUploading(true);
      }
      if (status === "done") {
        setIsImageUploading(false);
        message.success(
          `${info.file.name.slice(0, 10)} file uploaded  successfully.`
        );
        setFieldValue(
          "images",
          info.fileList.map((file) => file.response)
        );
      } else if (status === "error") {
        message.error(`${info.file.name.slice(0, 20)} file upload failed.`);
      } else if(status === "removed"){
        setFieldValue(
          "images",
          []
        );
      }
    },
    onDrop(e) {
      // 
    },
  };

  const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
    initialValues: {
       name: "",
       images:[],
        price: "",
        sku:"",
        category:"",
        subcategory:"",
        itemCode:0,
        height:0,
        width:0,
        length:0,
        weight:0,
        hsnCode:0,
        perpiece:"",
        measurment:"",
        quantity:"",
        description:"",
        discount:0,
        mindiscription:"",
    },
    onSubmit: async (values, { setSubmitting }) => {
      
        try {
          setIsAdding(true);

          const sku = generateSKU(values.name, values.category, values.itemCode);
          console.log(typeof(sku))
          setFieldValue("sku", sku);

          if(isImageUploading){
            toast.error('Please wait while the images are uploading.');
            return;
          }
          if(values.images.length === 0){
            toast.error('Please select an image.');
            return;
          }
          const name = values.name.toLowerCase()
          const category = values.category.toLowerCase();
          const subcategory = values.subcategory.toLowerCase();
          const dataToSend = { ...values, category, subcategory, name , sku };
          console.log(dataToSend)
          const response = await axios.post(`${base_url}product/add`, dataToSend);
          
          if(response.data.error){
             throw new Error(response.data.error)
          }
          else{
            toast.success('Product Added Successfully')
          }
        } catch (error) {
        //    
        toast.error(error.message);
      } finally {
        setIsAdding(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="  mb-4 rounded-md gap-12 h-auto flex flex-col items-center justify-around p-6">
        <div className="text-3xl font-bold bg-[#0a2440] w-full rounded-md text-center text-white">
          <Link to="/admin/product-list">Add Products</Link>
        </div>
        {/* Product add */}
        <form onSubmit={handleSubmit} className="w-full space-y-12">
          {/* section sku code */}
          <div className="input-1 w-full flex-col flex">
            <label htmlFor="">SKU (Auto-generated)</label>
            <input
              readOnly
              type="text"
              id="sku"
              value={values.sku}
              className="h-14 border-2 rounded-md outline-none px-2 "
              placeholder="SKU will be generated automatically"
            />
          </div>
          {/* section-1 */}
          <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Name</label>
              <input
                required
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
                required
                type="number"
                id="price"
                value={values.price}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none px-2 placeholder:px-2 "
                placeholder="enter product price"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Price Per Piece</label>
              <input
                required
                type="number"
                id="perpiece"
                value={values.perpiece}
                onChange={handleChange}
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter product price"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Quantity</label>
              <input
                required
                type="number"
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
                required
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
                required
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
                required
                value={values.measurment}
                onChange={handleChange}
                id="measurment"
                type="text"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter Unit Of Measurement"
              />
            </div>
          </div>
          {/* height width length */}
          <div className="flex gap-12 items-center justify-around">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Height</label>
              <input
                value={values.height}
                onChange={handleChange}
                type="number"
                id="height"
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter Item Height"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Width</label>
              <input
                value={values.width}
                onChange={handleChange}
                type="number"
                id="width"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter Width"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Length</label>
              <input
                value={values.length}
                onChange={handleChange}
                id="length"
                type="number"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter Lenght"
              />
            </div>
          </div>
          {/* section-3 */}
          <div className="flex gap-12 items-center justify-around">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Discount</label>
              <input
                type="number"
                id="discount"
                value={values.discount}
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
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">weight (kg)</label>
              <input
                value={values.weight}
                onChange={handleChange}
                id="weight"
                type="number"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter Lenght"
              />
            </div>
          </div>
          {/* section-4 */}
          {/* section-5 */}
          <div className="space-y-2">
            <label htmlFor="">Product Description</label>
            <TextField
              required={true}
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
              <button disabled={isAdding} className="w-full border-2 cursor-pointer  text-center border-[#0a2440] text-[#0a2440] px-12 py-2 hover:text-white  duration-300 hover:bg-[#0a2440] disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed" type="submit">{isAdding ? 'Adding...' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
