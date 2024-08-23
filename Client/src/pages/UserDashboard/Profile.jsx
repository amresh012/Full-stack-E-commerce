import React, { useState } from 'react'
import {faker} from "@faker-js/faker"
import moment from "moment"
import { MdCurrencyRupee } from "react-icons/md";
import { PlusOutlined } from '@ant-design/icons';
import {Upload } from 'antd';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });



const Profile = () => {
    let user = useSelector((state)=>state.auth?.user)
    console.log(user)
   const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: faker.image.avatar(),
      },
    ]);
    console.log(fileList)
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
      <button
        style={{
          border: 12,
          background: 'none',
        }}
        type="button"
      >
        <PlusOutlined />
        <div
          style={{
            marginTop: 2,
          }}
        >
          Upload
        </div>
      </button>
    );
  return (
   
   <>
   <div className="mx-4 flex flex-col rounded-md overflow-clip  shadow-sm">
    <div className="image ">
      <img src="https://img.freepik.com/free-photo/two-grey-cardboard-papers-corner-blue-backdrop_23-2147878447.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid" 
      alt="" className='w-[100vw] h-[20vh] object-cover' />
    </div>
    <div className="flex flex-col items-center justify-center p-2 relative">
     <div className="absolute -top-8">
     <Upload
        action="https://images.deepmart.shop/upload"
        listType="picture-circle"
        fileList={fileList}
        multiple:false
        onPreview={handlePreview}
        openFileDialogOnClick:true
        accept="images/*"
        onChange={handleChange}
        disabled:true
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
     </div>
      <div className="flex items-center justify-center flex-col mt-16 p-2">
       <p className="name font-bold text-xl">{faker.person.fullName()}</p>
       <div className="">
       <ul className="flex gap-8">
        <li className="space-y-2 list-disc">
          Member Since <span>{moment().format("MMM Do YY")}</span>
        </li>
        <li className="list-disc">{faker.location.city()},{" "}{faker.location.state()}</li>
       </ul>
       </div>
      </div>
      <div className="edit-profile w-full flex items-center justify-center gap-8 p-2 ">
       <Link to="/profile/setting">
       <button className=' border-2 rounded-md px-12 py-2 text-white bg-[#038CCC]'>Edit Profile</button>
       </Link>
       <Link to="/profile/shipping-add">
       <button className='border-2  rounded-md px-12 py-2 text-white bg-[#038CCC]'>Edit Address</button>
       </Link>
       </div>
    </div>
   </div>

   <div className=" flex-col lg:flex-row mt-12 mx-4  p-4 gap-4 flex items-center justify-center">
    <div className="  w-1/2 p-4 rounded-md flex  flex-col-reverse justify-between  px-4 text-white bg-[#038CCC]">
    <h1 className=''>Total Orders</h1>
    <p className="orders-number rounded-md  text-3xl">
      {faker.random.numeric(5) }
    </p>
    </div>
    <div className="border-2  w-1/2 p-4 rounded-md flex flex-col-reverse justify-between px-4 text-white bg-[#038CCC]">
    <p className=""> Total Expense</p>
    <p className="expense flex items-center text-3xl">
      <MdCurrencyRupee/>
      <span>{faker.random.numeric(2, { bannedDigits: ['0'] })},{faker.random.numeric(3)}{"."}{faker.random.numeric(2)}</span>
    </p>
    </div>
   </div>
   </>
  )
}

export default Profile
