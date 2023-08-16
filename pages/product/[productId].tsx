import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { BsCurrencyRupee } from 'react-icons/bs';

function ProductPage({product}: any) {

  return (
    <div className="flex p-6">
  {/* Product Image */}
    <div className="w-1/3">
        <img src={product?.images[0]} alt="Product" className="max-w-full h-[600px] object-fit rounded-xl" />
    </div>
    
    {/* Product Content */}
    <div className="w-2/3 px-10">
        <h2 className="text-xl font-semibold text-neutral-400">{product.brand}</h2>
        <h1 className='font-semibold text-lg'>{product.name}</h1>
        <p className="text-gray-600 text-md mb-3 bg-neutral-100 p-5 rounded-xl px-10 my-4">
        {product.description}
        </p>
        <h1>Seller: <span className='font-semibold text-neutral-700'>{product.seller}</span></h1>
        <h1>Seller Rating: <span className='font-semibold text-neutral-700'>{product.seller_rating}</span></h1>

        <h1 className='text-rose-500 font-semibold mt-3'>{product.stock}</h1>

        <div className="flex items-center mb-2">
        <span className="text-2xl font-semibold text-green-500 flex items-center">
          <BsCurrencyRupee/>
          {product.price}</span>
        <span className="text-gray-400 ml-2 line-through flex items-center">
          <BsCurrencyRupee/>
          {product.original_price}</span>
        <span className="font-semibold text-cyan-500 ml-2">{product.discount}</span>
        </div>

        <div className='flex items-center'>
            <div className='bg-neutral-100 border-2 text-sm p-1 flex rounded-xl space-x-2'>
                <h1>Reviews</h1>
                <h1 className='font-semibold'>{product.reviews_count}</h1>
            </div>
            {
              product.f_assured &&
              <img className='h-5 ml-2' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"></img>
            }
        </div>

        <p className="text-gray-600 text-sm">{product.return_policy}</p>
        
        <div className='flex space-x-4 mt-4'>
            <button className="bg-sky-500 font-semibold text-white px-6 py-3 rounded-xl shadow-md hover:bg-sky-600">
            Add to Cart
            </button>
            <button className='p-3 bg-neutral-100 rounded-xl border-2 hover:bg-neutral-200'>Add to Wishlist</button>
        </div>
        <div className="mt-6">
            
        <p className="text-gray-600 text-sm flex items-center">Free shipping on orders over <BsCurrencyRupee/>50</p>
        </div>


        <div className='mt-5 w-2/4'>
            <h1 className='font-semibold text-xl mb-1 text-neutral-600'>Specifications</h1>
            <h1>{product.formatted_specifications}</h1>
        </div>
    </div>
    </div>

  )
}

export default ProductPage;

export const getServerSideProps = async ({ params }: any) => {
  try {
    const productId = params?.productId;

    if (productId) {
      const response = await axios.get(`http://127.0.0.1:5000/api/product-details/${productId}`);
      const product = response.data;

      return {
        props: {
          product,
        },
      };
    }

    return {
      notFound: true,
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return {
      notFound: true,
    };
  }
};
