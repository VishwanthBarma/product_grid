import React, { useContext } from 'react'
import { ProductRecommendationContext } from '../../Context/ProductRecommendationContext'
import axios from 'axios';
import Product from '../../components/Product';

function OrderHistory({orderedData}:any) {
    console.log(orderedData)
  return (
    <div className='p-5'>
        <h1 className='font-bold text-2xl mb-4'>Previous Order History</h1>
        {
            orderedData?.length != 0 ?
            <div className='grid grid-cols-4 gap-4 place-content-center'>
                {
                    orderedData?.map((product:any) => 
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
                <h1 className='font-bold text-neutral-700'>No Products Ordered</h1>
            </div>
        }
    </div>
  )
}

export default OrderHistory;

export const getServerSideProps = async ({ params }: any) => {
    try {
      const userId = params?.userId;
  
      if (userId) {
        const response = await axios.get(`http://127.0.0.1:5000/api/get-ordered-products/${userId}`);
        const orderedData = response.data;
  
        return {
          props: {
            orderedData,
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