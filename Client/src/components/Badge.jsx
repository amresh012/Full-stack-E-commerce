import React from 'react'
import "./Badge.css"
const Badge = ({discount}) => {
  return (
    <>
    {
      discount > 0 && <div className='ribbon'>
      <div className="">{discount}%</div>
    </div>
    }
    </>
  )
}

export default Badge
