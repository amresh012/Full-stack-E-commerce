import { Autocomplete, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { gym_equipment } from "../../constant";
import { useFormik } from "formik";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import { toast, Toaster } from "react-hot-toast";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useEffect, useState } from "react";
import { config } from "../../Utils/axiosConfig";

const ProductEdit = () => {
  const { id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    itemCode: "",
    height: 0,
    width: 0,
    length: 0,
    weight: 0,
    hsnCode: "",
    perpiece: "",
    measurment: "",
    quantity: "",
    description: "",
    discount: 0,
    mindiscription: "",
  });

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: `https://images.deepmart.shop/upload`,
    onChange(info) {
      // console.log(info);
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
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
      } else if (status === "removed") {
        setFieldValue("images", []);
      }
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
  //   initialValues: product,
  //   onSubmit: async (values, { setSubmitting }) => {
  //     try {
  //       const name = product.name.toLowerCase();
  //       const category = product.category.toLowerCase();
  //       const subcategory = product.subcategory.toLowerCase();
  //       const dataToSend = { ...values, category, subcategory, name };
  //       const response = await axios.post(`${base_url}product/add`, dataToSend);
  //       console.log(values);
  //       if (response.data.error) {
  //         throw new Error(response.data.error);
  //       } else {
  //         toast.success("Product Added Successfully");
  //       }
  //     } catch (error) {
  //       //    console.log(error.message)
  //       toast.error(error.message);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   },
  // });

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      if(isImageUploading){
        toast.error('Please wait while the images are uploading.');
        return;
      }

      const name = product.name.toLowerCase();
      const category = product.category.toLowerCase();
      const subcategory = product.subcategory.toLowerCase();
      const dataToSend =
        images?.length > 0
          ? { ...product, category, subcategory, name, images }
          : { ...product, category, subcategory, name, images: undefined };
      const response = await axios.post(
        `${base_url}product/update`,
        dataToSend,
        config
      );
      if (response.data?.success) {
        toast.success("Product Updated Successfully");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setIsUpdating(false);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`${base_url}product/${id}`);
      const data = await response.json();
      setProduct({
        _id: data?._id,
        name: data?.name,
        images: [],
        price: data?.price,
        category: data?.category,
        subcategory: data.subcategory,
        itemCode: data?.itemCode,
        height: data?.height,
        width: data?.width,
        length: data?.length,
        weight: data?.weight,
        hsnCode: data?.hsnCode,
        perpiece: data?.perpiece,
        measurment: data?.measurment,
        quantity: data?.quantity,
        description: data?.description,
        corporateDiscount: +data?.corporateDiscount,
        mindiscription: data?.mindiscription,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (key, value) => {
    setProduct((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    } else {
      fetchProductDetails(id);
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className="border-2 mt-24 mb-4 rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around mx-4 p-6">
        <div className="text-3xl font-bold bg-[#0a2440] w-full p-4 rounded-md text-center text-white">
          <Link to="/admin/product-list">Edit Product</Link>
        </div>
        {/* Product add */}
        <form onSubmit={editProduct} className="w-full space-y-12">
          {/* section-1 */}
          <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Name</label>
              <input
                required
                type="text"
                id="name"
                value={product.name}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter product name"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Category</label>
              <input
                type="text"
                value={product.category}
                id="category"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
                placeholder="enter category"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Product Sub category</label>
              <input
                type="text"
                value={product.subcategory}
                id="subcategory"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.price}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.perpiece}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.quantity}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.itemCode}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.hsnCode}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.measurment}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.height}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                type="number"
                id="height"
                className="h-14 border-2 rounded-md outline-none px-2 "
                placeholder="enter Item Height"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Width</label>
              <input
                value={product.width}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                type="number"
                id="width"
                className="h-14 border-2 rounded-md outline-none  px-2 "
                placeholder="enter Width"
              />
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="">Length</label>
              <input
                value={product.length}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                id="corporateDiscount"
                value={product.corporateDiscount}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                value={product.weight}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
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
              value={product.mindiscription}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
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
            <button
            disabled={isUpdating}
              className="w-full border-2 cursor-pointer  text-center border-[#0a2440] text-[#0a2440] px-12 py-2 hover:text-white  duration-300 hover:bg-[#0a2440] disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed"
              type="submit"
            >
              {isUpdating ? 'Updating...' : 'Edit Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEdit;
