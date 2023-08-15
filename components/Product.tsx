import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { ProductRecommendationContext } from '../Context/ProductRecommendationContext';


function Product() {
    const router = useRouter();
    const { user }:any = useContext(ProductRecommendationContext);
    
  return (
    <div onClick={() => router.push(`/product/${user}`)} className='bg-neutral-100 p-3 rounded-xl flex flex-col space-y-1 hover:shadow-lg cursor-pointer'>
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
        <div className='flex justify-between space-x-2'>
            <button className='bg-sky-500 p-2 rounded-xl flex-1 font-sembold text-white hover:bg-sky-400 active:bg-sky-600'>
                <h1 className='font-bold'>ADD TO CART</h1>
            </button>
            <button className='bg-white p-2 rounded-xl fle font-sembold text-white active:bg-sky-600 hover:bg-neutral-600'>
                <AiOutlineHeart className='text-pink-500 text-2xl'/>
            </button>
        </div>
    </div>
  )
}

export default Product