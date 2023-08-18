import React, { useContext } from 'react'
import { ProductRecommendationContext } from '../../Context/ProductRecommendationContext'
import axios from 'axios';
import Product from '../../components/Product';

function Wishlist({wishlistData}:any) {
  return (
    <div className='p-5'>
        <h1 className='font-bold text-2xl mb-4'>Wishlist</h1>
        {
            wishlistData?.length != 0 ?
            <div className='grid grid-cols-4 gap-4 place-content-center'>
                {
                    wishlistData?.map((product:any) => 
                    <Product
                    key={product?.product_id}
                    image={product?.images}
                    rating={product?.avg_rating}  
                    name={product?.product_name}
                    description={product?.description}
                    price={product?.price}
                    stock={product?.stock}
                    productId = {product?.product_id}
                    original_price = {product?.original_price}
                    discount = {product?.discount}
                    />
                    )
                }
            </div>
            :
            <div className='flex flex-col items-center justify-center bg-white p-3 rounded-xl'>
                <h1 className='font-bold text-neutral-700'>No Products In Wishlist</h1>
            </div>
        }
    </div>
  )
}

export default Wishlist;

export const getServerSideProps = async ({ params }: any) => {
    try {
      const userId = params?.userId;
  
      if (userId) {
        const response = await axios.get(`http://127.0.0.1:5000/api/get-wishlist/${userId}`);
        const wishlistData = response.data;
  
        return {
          props: {
            wishlistData,
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