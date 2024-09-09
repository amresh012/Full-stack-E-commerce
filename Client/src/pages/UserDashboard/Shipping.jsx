import React, { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { FaAddressCard } from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { base_url } from "../../Utils/baseUrl";
import axios from "axios";
import { config } from "../../Utils/axiosConfig";
const Shipping = () => {
  const { user } = useSelector((state) => state.auth); 
  const address = user.address
  console.log(address)
const [selectedAddress, setSelectedAddress] = useState(null);
 const dispatch = useDispatch()
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const datatoSend = {...values }
      try {
        const response = await axios.post(`${base_url}user/adr`, datatoSend, config);
        console.log(response)
        if(response.data.success)
        {
          toast.success(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // function isPlainObject(value) {
  //   return Object.prototype.toString.call(value) === "[object Object]";
  // }
  // const palinObj = isPlainObject(selectedAddress);
  // console.log(palinObj)

  const handleAddressSelect = (address) => {
    console.log(address , typeof(address))
    setSelectedAddress(address);
    dispatch(setSelectedAddress(address));

  };
  return (
    <>
      <Toaster />
      <div className="border-2  rounded-md ">
        <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex flex-wrap items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <FaAddressCard />
          </div>
          <h1 className="uppercase">Add New Address</h1>
        </div>
        {/* address form */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-around items-center gap-2">
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Full Name:</label>
                <input
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  className="h-14 border-2 rounded-md outline-none px-2 "
                  placeholder="enter  name"
                />
              </div>
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Mobile NO:</label>
                <input
                  type="text"
                  value={values.mobile}
                  onChange={handleChange}
                  id="mobile"
                  className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
                  placeholder="enter mobile no"
                />
              </div>
            </div>
            <div className="flex justify-around items-center gap-12">
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Address:</label>
                <input
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  id="address"
                  className="h-14 border-2 rounded-md outline-none px-2 "
                  placeholder="enter address"
                />
              </div>
            </div>
            <div className="flex justify-around items-center gap-12">
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">CITY:</label>
                <input
                  type="text"
                  id="city"
                  value={values.city}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md outline-none px-2 "
                  placeholder="enter city"
                />
              </div>
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">STATE:</label>
                <input
                  type="text"
                  id="state"
                  value={values.state}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
                  placeholder="enter state"
                />
              </div>
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="">POSTAL CODE:</label>
                <input
                  type="text"
                  id="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
                  placeholder="enter postal code"
                />
              </div>
            </div>
            <div
              className="px-12 py-2 bg-[#144170] w-fit font-bold  cursor-pointer
            hover:bg-[#144170]/80 text-white duration-500 rounded-md
            "
            >
              <button type="submit" className="uppercase">
                Add Address
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Old Addresses Section */}
      <div className="border-2 mb-4 mt-12 rounded-md">
        <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <FaAddressCard />
          </div>
          <h1 className="uppercase">Old Addreses</h1>
        </div>
        <div className="p-4 border-2">
          <div className="border-2 p-4  rounded-md shadow-md flex flex-col items-center gap-4 h-24">
            {address === null ? "No addre" : address?.map((add) => (
              <div
                key={add.id}
                className="flex items-center gap-4 p-4 border w-full"
              >
                <input
                  type="checkbox"
                  name="address"
                  checked={selectedAddress === add}
                  onChange={() => handleAddressSelect(add)}
                  id="address1"
                />
                <ul className="flex  gap-4">
                  <li className="">Addres:{add.address}</li>
                  <li className="">City:{add.city}</li>
                  <li className="">Mobile No:{add.mobile}</li>
                  <li className="">Name:{add.name}</li>
                  <li className="">State:{add.state}</li>
                  <li className="">ZipCode:{add.zipcode}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
