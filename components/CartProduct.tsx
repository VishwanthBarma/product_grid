import React from 'react'
import { BsCurrencyRupee } from "react-icons/bs";

function CartProduct() {
  return (
    <div className='flex space-x-5 p-2'>
        <div className='w-1/6 rounded-xl'>
            <img src="https://www.91-img.com/pictures/143993-v4-apple-iphone-14-mobile-phone-large-4.jpg"></img>
        </div>
        <div className='w-3/5 flex flex-col justify-start'>
            <h1 className='text-xl'>iPhone 14 Pro Max</h1>
            <h1 className='font-bold text-xl flex items-center'><BsCurrencyRupee />65000</h1>
            <h1 className='text-green-700 text-sm'>In stock</h1>
        </div>
        <div className='w-1/5 bg-neutral-200 rounded-xl flex flex-col p-3 space-y-1 items-start'>
            <div className='flex flex-col mb-3'>
                <h1 className='font-semibold mb-1'>Quantity</h1>
                <div className='flex space-x-3 bg-neutral-100 justify-between p-1 px-3 items-center rounded-xl'>
                    <button className='text-sky-500 text-xl'>+</button>
                    <h1>2</h1>
                    <button className='text-rose-500 text-xl'>-</button>
                </div>
            </div>
            <button className='text-cyan-700'>Delete</button>
            <button className='text-cyan-700'>Save for later</button>
            <button className='text-cyan-700'>See more like this</button>
            <button className='text-cyan-700'>Share</button>
        </div>
    </div>
  )
}

export default CartProduct