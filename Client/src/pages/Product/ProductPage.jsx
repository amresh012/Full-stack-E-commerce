import { Skeleton } from '@mui/material'
import React from 'react'

const Product = () => {
  return (
    <div>
      {
        [...Array(10)].map((item) => (
          <div className="">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </div>

        ))
      }
    </div>
  )
}

export default Product
