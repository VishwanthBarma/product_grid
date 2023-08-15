import React from 'react'
import Product from '../Components/Product'

function TopProducts() {
  return (
    <div className='flex flex-col p-5 space-y-5'>
        <h1 className='font-bold text-xl'>Top Products</h1>

        <div className="grid grid-cols-4 gap-4">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </div>

    </div>
  )
}

export default TopProducts