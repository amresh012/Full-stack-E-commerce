import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { FaAddressCard} from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { base_url } from "../../Utils/baseUrl";
import axios from "axios";
import { config } from "../../Utils/axiosConfig";
import { selectedAddress , clearSelectedAddress } from "../../features/addressSlice";
import {adduser} from "../../features/authSlice"
import { useNavigate } from "react-router-dom";
import  AnimatedDeleteButton from "../../components/Ui/AnimatedDeleteButton"

const Shipping = () => {

  const navigate = useNavigate()
  const  user  = useSelector((state) => state?.auth?.user);
  const [reload, setReload] = useState(true)
  const [currentAddress, setCurrentAdd] = useState(null);
  const [addressList, setAddressList] = useState(user?.address || []);
  const dispatch = useDispatch()
  const id = localStorage.getItem("id") || user?._id

  const fetchUserAddress =  async()=>{
    try{
      const response = await axios.get(`${base_url}user/${id}` , config)
      // console.log(response)
      if(!response.data.error){
        setAddressList(response.data.address)
      }
      else{
        throw new Error(response.data.error)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
   }
 useEffect(()=>{
  fetchUserAddress()
 },[reload])


  const handleDeleteAddress = async (addressId) => {
    confirm("Are You Sure You Want To delete this Address")
    try {
      const response = await axios.delete(`${base_url}user/adr/delete/${addressId}` ,config);
      if(response.data.error){
        throw new Error()
      }
      else{
        toast.success("Address deleted successfully");
        fetchUserAddress();
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete address. Please try again.");
    }
    finally{
      fetchUserAddress();
      clearSelectedAddress()
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
      const datatoSend = { ...values }
      try {
        const response = await axios.post(`${base_url}user/adr`, datatoSend,config);
        console.log(response)
        if(response.data.success)
        {
          dispatch(adduser(response.data));
          toast.success(response.data.message);
          fetchUserAddress();
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



  const handleAddressSelect = (address) => {
    setCurrentAdd(address);
    dispatch(selectedAddress(address));
    toast.success("Address selected successfully");
    setTimeout(()=>{
      navigate("/checkout")
    },2000)

  };
  return (
    <div className="w-full">
      <Toaster />
      <div className="rounded-md ">
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
            {addressList === undefined || addressList.length <=0 || addressList === null
              ? <div className="">
                <p className="text-lg font-bold">No old addresses found</p>
              </div>
              : addressList?.map((add) => (
                  <div
                    key={add.id}
                    className="flex items-start gap-4 p-4 border-b bg-gray-100 w-full"
                  >
                    <input
                      type="checkbox"
                      name="address"
                      checked={currentAddress  === add}
                      onChange={() => handleAddressSelect(add)}
                      id="address1"
                    />
                    <ul className="flex flex-col  gap-4">
                      <li className="italic"><span className="font-bold pr-2 font-serif uppercase">Addres</span> :{add.address || "Loading..."}</li>
                      <li className="italic"><span className="font-bold pr-2 font-serif uppercase">City</span>:{add.city || "Loading..." }</li>
                      <li className="italic"><span className="font-bold pr-2 font-serif uppercase">Mobile</span>:{add.mobile|| "Loading..."}</li>
                      <li className="italic"><span className="font-bold pr-2 font-serif uppercase">Name</span>:{add.name|| "Loading..."}</li>
                      <li className="italic"><span className="font-bold pr-2 font-serif uppercase">State</span>:{add.state|| "Loading..."}</li>
                      <li className="italic"><span className="font-bold pr-2 font-serif uppercase">PinCode</span>:{add.zipcode|| "Loading..."}</li>
                    </ul>
                    <button
                    onClick={() => handleDeleteAddress(add._id)}
                    className="ml-auto shadow-md"
                  >
                   <AnimatedDeleteButton/>
                  </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
