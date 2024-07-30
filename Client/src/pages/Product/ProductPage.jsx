import { Skeleton } from '@mui/material'
import React from 'react'

const Product = () => {
  return (
    <div>
      {
        [...Array(10)].map((item)=>(
           <Skeleton variant="rectangular" width={210} height={118} />

        ))
      }
    </div>
  )
}

export default Product
