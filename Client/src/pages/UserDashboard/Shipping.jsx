import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { FaAddressCard, FaTrash } from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { base_url } from "../../Utils/baseUrl";
import axios from "axios";
import { config } from "../../Utils/axiosConfig";
import { selectedAddress } from "../../features/addressSlice";
import {adduser} from "../../features/authSlice"
const Shipping = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentAddress, setCurrentAdd] = useState(null);
  const [addressList, setAddressList] = useState(user?.address || []);
  const dispatch = useDispatch()

  const id = localStorage.getItem("id")
  // console.log(id)

  const fetchAddresses = async () => {
    try {
      const response = await axios.post(`${base_url}user/adr/${id}`, {}, config);
      console.log(response)
      setAddressList(response.data);
    } catch (error) {
      toast.error("Failed to fetch addresses. Please try again.");
    }
  };
  useEffect(() => {
    if (!user?.address?.length) {
      fetchAddresses();
    } else {
      setAddressList(user.address);
    }
  }, [user]);

  const handleDeleteAddress = async (addressId) => {
    // if(addressId === undefined) return
    try {
      const response = await axios.delete(`${base_url}user/adr/delete/${addressId}`, config);
      console.log(response)
      if (response.status === 200) {
        // Refresh address list
        fetchAddresses();
        toast.success("Address deleted successfully");
      }
    } catch (error) {
      // console.log(error)
      toast.error("Failed to delete address. Please try again.");
    }
  };

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
          dispatch(adduser(response.data));
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
  console.log(addressList)


  const handleAddressSelect = (address) => {
    setCurrentAdd(address);
    dispatch(selectedAddress(address));

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
      <div className=" mb-4 mt-12 rounded-md">
        <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <FaAddressCard />
          </div>
          <h1 className="uppercase">Old Addreses</h1>
        </div>
        <div className="p-4">
          <div className=" p-4 flex flex-col border-2 items-center gap-4">
            {addressList === undefined || addressList.length <=0
              ? <div className="">
                <p className="text-lg font-bold">No old addresses found</p>
              </div>
              : addressList?.map((add) => (
                  <div
                    key={add.id}
                    className="flex items-start gap-4 p-4 border w-full"
                  >
                    <input
                      type="checkbox"
                      name="address"
                      checked={currentAddress  === add}
                      onChange={() => handleAddressSelect(add)}
                      id="address1"
                    />
                    <ul className="flex flex-col  gap-4">
                      <li className="">Addres:{add.address}</li>
                      <li className="">City:{add.city}</li>
                      <li className="">Mobile No:{add.mobile}</li>
                      <li className="">Name:{add.name}</li>
                      <li className="">State:{add.state}</li>
                      <li className="">ZipCode:{add.zipcode}</li>
                    </ul>
                    <button
                    onClick={() => handleDeleteAddress(add._id)}
                    className="ml-auto text-red-500"
                  >
                    <FaTrash />
                  </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
