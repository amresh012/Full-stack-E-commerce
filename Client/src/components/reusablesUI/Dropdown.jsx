import React from 'react'


const Dropdown = ({dataArray}) => {
  return (
    <div className="">
    <select className=' p-2 outline-none border-2 border-gray-500'>
      {
         dataArray?.map((option)=>(
            <option key={option?.id}>{option?.items}{"   "} {option.value}</option>
           ))
      }
    </select>
</div>
  )
}

export default Dropdown
