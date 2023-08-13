import React from 'react'
import CartProduct from '../Components/CartProduct'

function cart() {
  return (
    <div className='flex space-x-2 m-2 p-2'>
        <div className='w-3/4 bg-neutral-100 p-5 rounded-xl'>
            <h1 className='font-bold text-2xl mb-3 border-b-2'>Shopping Cart</h1>
            <div className='flex flex-col max-h-[calc(100vh-200px)] overflow-y-scroll space-y-2'>
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
            </div>
        </div>

        <div className='w-1/4 bg-neutral-100 rounded-xl flex flex-col space-y-2 p-3'>
            <h1 className='font-bold text-neutral-500 text-center text-lg'>Price Details</h1>
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <h1>Price</h1>
                    <h1>230</h1>
                </div>
                <div className='flex justify-between'>
                    <h1>Discount</h1>
                    <h1>130</h1>
                </div>
            </div>
            <div className='flex justify-between bg-neutral-300 p-2 rounded-xl items-center'>
                <h1 className='font-semibold'>Total amount</h1>
                <h1 className='font-bold text-lg'>450</h1>
            </div>
            <div className='flex flex-col space-y-1'>
                <h1>Safe and Secure Payments</h1>
                <h1>We are irresponsible</h1>
            </div>

            <button className='bg-sky-500 text-white p-2 rounded-xl'>Place Order</button>
        </div>

    </div>
  )
}

export default cart