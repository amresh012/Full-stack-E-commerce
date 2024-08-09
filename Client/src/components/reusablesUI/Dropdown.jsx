import React from 'react'


const Dropdown = ({dataArray}) => {
  return (
    <div className="">
    <select className=' p-2 outline-none border-2 border-gray-500'>
      {
        Array.isArray(dataArray)&&  dataArray?.map((option)=>(
          <option key={option?.id}>{option.value}</option>
         ))
      }
    </select>
</div>
  )
}

export default Dropdown
