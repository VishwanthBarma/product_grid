import React from 'react'
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";


function Product() {
  return (
    <div className='bg-neutral-100 p-3 rounded-xl flex flex-col space-y-1'>
        <img className="h-auto max-w-full rounded-lg mb-2" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
        <h1 className=''>Title</h1>
        <h1 className='text-xs text-neutral-400'>Description</h1>
        <div className='flex space-x-1 items-center bg-green-600 text-white font-bold w-16 justify-center rounded-xl'>
            <h1>4.5</h1>
            <AiFillStar/>
        </div>
        <h1 className='flex items-center font-semibold text-lg'>
            <BsCurrencyRupee/>
            3200
        </h1>
        <h1 className='text-sm text-green-600'>In stock</h1>
        <button className='bg-orange-400 p-1 rounded-xl font-sembold text-white'>ADD TO CART</button>
    </div>
  )
}

export default Product