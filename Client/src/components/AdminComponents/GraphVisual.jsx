import { Button } from '@mui/material'
import React from 'react'
import {  FaUsers ,FaBars  } from 'react-icons/fa6'
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';
import { CiCirclePlus } from "react-icons/ci";
import { GrSubtractCircle } from "react-icons/gr";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { FaRegHandPaper } from "react-icons/fa";
import Paper from '@mui/material/Paper';


const options =["Download PNG", "Download SVG","Download CSV"]

const title = ["Users", "Product", "Contact us", "Bulk Request"]

const GraphVisual = () => {
  return (
    <div className=' mt-12 flex flex-wrap items-center justify-center  g gap-10'>
      {
        [...Array(4)].map((_,i)=>(
         <Paper key={i} elevate={3}>
             <div className="w-[35rem] h-[25rem] shadow-lg">
            <div className="header flex items-center justify-between p-4">
                {/* left-side */}
                <div className="flex text-xl items-center gap-2">
                <IconButton 
                aria-label="user-icon"
                 sx={{bgcolor:"royalblue" , color:"white"}}
                  >
                 <FaUsers/>
                </IconButton>
                <p className='text-2xl tracking-wider '>
                    {title[i]}-
                    </p>
                </div>
                {/* right-side */}
                <Link to="/users" className='pl-20'>
                <Button variant="contained">View</Button>
                </Link>
            </div>
            <div className="">
            <div className="flex gap-3 cursor-pointer w-full items-center justify-end ">
                  <CiCirclePlus size={20}/>
                  <GrSubtractCircle  size={20}/>
                  <HiMagnifyingGlassPlus  size={20}/>
                  <FaRegHandPaper  size={20}/>
                  <IoMdHome  size={20}/>
                </div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]}]}
                series={[
                    {
                    data: [1, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8,9],
                    showMark: ({ index }) => index % 1 === 0,
                    },
                    {
                        data: [4, 3, 6.5, 4.5, 1.9, 5, 11, 4.3, 6, 8,9],
                        showMark: ({ index }) => index % 2 === 0,
                    },
                ]}
                width={550}
                height={320}
              /> 
            </div>
          </div> 
         </Paper> 
        ))
      }
    </div>
  )
}

export default GraphVisual



{/* <LineChart
  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
  series={[
    {
      data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
      showMark: ({ index }) => index % 2 === 0,
    },
  ]}
  width={500}
  height={300}
/> */}