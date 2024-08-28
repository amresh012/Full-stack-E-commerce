import React from 'react'

const Dashboard = () => {
  function getGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let greeting;
    
        if (hour < 12) {
            greeting = "Good morning!";
        } else if (hour < 18) {
            greeting = "Good afternoon ";
        } else {
            greeting = "Good evening!";
        }
    
        return greeting;
    }
  return (
    <div className='w-full h-full bg-gray-200'>
      <div className="header p-4 flex bg-[] flex-col items-start">
        <span className='text-[4vmax]'>{getGreeting()}! </span>
        <h1 className='uppercase'>Welcome to Admin DashBoard</h1>
      </div>

    </div>
  )
}

export default Dashboard





































// import React, { useState } from 'react'
// import AccountMenu from "../../components/UserDashComp/AccountMenu";
// import { FaSearch } from 'react-icons/fa';
// import { IoNotificationsOutline } from "react-icons/io5";
// import { FaRupeeSign } from "react-icons/fa";
// import { TbMoneybag } from "react-icons/tb";
// import { MdOutlinePayments } from "react-icons/md";
// import { FaUsers } from "react-icons/fa";
// import { GoChecklist } from "react-icons/go";
// import { MdOutlineCorporateFare } from "react-icons/md";
// import { LineChart } from '@mui/x-charts/LineChart';
// import { Chip, Rating } from '@mui/material';
// import { Progress } from 'antd';
// import {Equip1}from "../../assets/images"

// const Dashboard = () => {

//   function getGreeting() {
//     const now = new Date();
//     const hour = now.getHours();
//     let greeting;

//     if (hour < 12) {
//         greeting = "Good morning!";
//     } else if (hour < 18) {
//         greeting = "Good afternoon ";
//     } else {
//         greeting = "Good evening!";
//     }

//     return greeting;
// }
 
//   return (
//     <>
//      <div className="h-24 flex justify-around  w-full p-4 ">
         
//           <div className="actions flex justify-end items-center h-full" >
//           {/* <div className="">
//             <IoNotificationsOutline size={30}/>
//           </div>
//           <div className="Acount">
//             <AccountMenu/>
//           </div> */}
//           </div>
//         </div>
//     <div className="flex items-start gap-4 justify-start">
//       <div className="flex flex-col justify-between items-center pl-4 ">
//         {/* section-2 */}
//         <div className="header-right w-full  h-24 p-4">
//         <h1 className='text-3xl'>{getGreeting()}! </h1>
//         <p className='uppercase'>Weclome tO Admin DashBoard</p>
//         </div>
//         <div className="analytics flex gap-2">
//           <div className="total-sales flex flex-col font-bold items-center rounded-md  shadow-md p-4 bg-[#0A2440] text-white">
//            <p className=''>
//            <TbMoneybag size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Revenu</h1>
//             <p className="flex items-center text-2xl">
//               <FaRupeeSign/>
//               <p className="-mt-1">
//                 120,345.00
//               </p>
//             </p>
//           </div>
//           {/* total payments */}
//           <div className="total-sales flex flex-col items-center rounded-md  shadow-md p-4  bg-[#0A2440] text-white font-bold ">
//            <p className=''>
//            <MdOutlinePayments size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Payments</h1>
//             <p className="flex items-center text-2xl">
//               <FaRupeeSign />
//               <p className="-mt-1">
//                 100,345.00
//               </p>
//             </p>
//           </div>
//           {/* total customers */}
//           <div className="total-sales flex flex-col items-center rounded-md  shadow-md p-4  bg-[#0A2440] text-white font-bold ">
//            <p className=''>
//            <FaUsers size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Customers</h1>
//             <p className="flex items-center text-2xl">
//               <p className="-mt-1">
//                 129087
//               </p>
//             </p>
//           </div>
//           {/* total orders */}
//           <div className="total-sales flex flex-col items-center rounded-md  shadow-md p-4 bg-[#0A2440] text-white font-bold w-[10rem]">
//            <p className=''>
//            <GoChecklist size={50}/>
//            </p>
//             <h1 className=' font-light pt-2'>Total Orders</h1>
//             <p className="flex items-center text-2xl">
//               <p className="-mt-1">
//                 11287
//               </p>
//             </p>
//           </div>
//         </div>
//         <div className="h-[50vh] w-[50vw] rounded-md border-2 mt-8 shadow-md bg-[#0A2440]">
//          <div className="p-2 text-2xl font-bold text-white">
//          <h1>Sales Graph</h1>
//          </div>
//          <div className="graph ">
//          <LineChart
//                 xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]}]}
//                 series={[
//                     {
//                     data: [1, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8,9],
//                     showMark: ({ index }) => index % 1 === 0,
//                     },
//                     {
//                         data: [4, 3, 6.5, 4.5, 1.9, 5, 11, 4.3, 6, 8,9],
//                         showMark: ({ index }) => index % 2 === 0,
//                     },
//                 ]}
//                 width={750}
//                 height={320}
//                 sx={{padding:"4px",stroke:"white",}}
//               /> 
//          </div>
//         </div>
//         <div className="h-[15rem] m-2 w-full border-2 mt-6 rounded-md shadow-md"></div>
//       </div>
//       <div className="right-content  mt-[5.5rem] flex-col flex py-2">
//         <div className=" w-[24rem] h-[9rem]  bg-[#0A2440] rounded-md  flex flex-col items-start  justify-start">
//         <div className="text-2xl px-4 py-4 text-white">
//             <h1>Customer Types</h1>
//           </div>
//          <div className="flex px-4 justify-around w-full">
//          <div className="text-white flex items-center gap-2 font-light">
//             <FaUsers size={50}/>
//             <div className="">
//             <p>Individual</p>
//             <span>36%</span>
//             </div>
//           </div>
//           <div className="text-white flex items-center gap-2 font-light">
//             <MdOutlineCorporateFare  size={50}/>
//             <div className="">
//             <p>Bussiness</p>
//             <span>76%</span>
//             </div>
//           </div>
//          </div>
//         </div>
//         <div className=" customer-reviews h-[20rem] w-[24rem] border-2 mt-6 rounded-md shadow-md p-2">
//           <div className="text-2xl p-2">
//             <h1>Customers Reviews</h1>
//           </div>
//           <div className=" flex gpa-12 w-full p-2 justify-center gap-12 ">
//           <Rating name="half-rating" value={4} defaultValue={2.5} precision={0.5} sx={{color:"#038CCC"}} />
//           <p>4.5 out of 5</p>
//           </div>
//           <p className='w-full text-center'>total review 300+</p>
//           <div className="rating">
//             <div className="flex items-center">
//               <p className='w-[5rem]'> 5 star</p>
//               <Progress percent={50} status="active"/>
//             </div>
//             {/*  */}
//             <div className="flex items-center">
//               <p className='w-[5rem]'> 4 star</p>
//               <Progress percent={70} status="active"/>

//             </div>

//             <div className="flex items-center">
//               <p className='w-[5rem]'> 3 star</p>
//               <Progress percent={60} status="active"/>

//             </div>

//             <div className="flex items-center">
//               <p className='w-[5rem]'> 2 star</p>
//               <Progress percent={40} status="active"/>

//             </div>

//             <div className="flex items-center">
//               <p className='w-[5rem]'> 1 star</p>
//               <Progress percent={10} status="active"/>

//             </div>
//           </div>
//         </div>
//         <div className=" top-products  overflow-y-scroll w-[24rem] border-2 mt-6 p-2 rounded-md shadow-md">
//           <div className="flex p-2 text-xl font-bold">
//             <h1>Top Products</h1>
//           </div>
//           <div className="p-2 h-full space-y-2 border-2 rounded-md ">
//             {
//               [...Array(6)].map((_,id)=>(
//                 <div className="border-2  rounded-md flex items-center p2 justify-between gap-2 " key={id}>
//                 <div className="flex items-center gap-2">
//                 <div className="image bg-[#0A2440]/20 w-fit">
//                   <img src={Equip1} alt="" className='h-12 w-12'/>
//                 </div>
//                 <div className="name">
//                   <span>Product name</span>
//                   <p className="price flex uppercase items-center"> <FaRupeeSign/> 12,34.00</p>
//                 </div>
//                 </div>
//                 <Chip label="334"/>
//               </div>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Dashboard
