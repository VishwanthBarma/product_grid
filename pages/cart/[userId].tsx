import React from 'react'
import CartProduct from '../../components/CartProduct'
import axios from 'axios';
import { BsCurrencyRupee } from 'react-icons/bs';

function cart({cartData}: any) {

    // Calculate total price and total discount
    const totalPrice = cartData.reduce((total:any, item:any) => total + item.price, 0);
    const totalDiscount = cartData.reduce((total:any, item:any) => total + item.discount, 0);

    // Calculate total amount by subtracting total discount from total price
    const totalAmount = totalPrice - totalDiscount;

  return (
    <div className='flex space-x-2 m-2 p-2'>
        <div className='w-3/4 bg-neutral-100 p-5 rounded-xl'>
            <h1 className='font-bold text-2xl mb-3 border-b-2'>Shopping Cart</h1>
            <div className='flex flex-col max-h-[calc(100vh-200px)] overflow-y-scroll space-y-2'>

            {
                cartData.length != 0?
                cartData.map((product:any) => <CartProduct image={product.images} name={product.product_name} price={product.price} stock={product.stock} />)
                :
                <h1 className='font-semibold text-center'>No Products In Cart</h1>
            }

            </div>
        </div>

        <div className='w-1/4 bg-neutral-100 rounded-xl flex flex-col space-y-2 p-3'>
            <h1 className='font-bold text-neutral-500 text-center text-lg'>Price Details</h1>
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <h1>Price</h1>
                    <h1 className='flex items-center'>
                        <BsCurrencyRupee/>{totalPrice}
                    </h1>
                </div>
                <div className='flex justify-between'>
                    <h1>Discount</h1>
                    <h1 className='flex items-center'>
                        <BsCurrencyRupee/>{totalDiscount}
                    </h1>
                </div>
            </div>
            <div className='flex justify-between bg-white border-2 p-2 rounded-xl items-center'>
                <h1 className='font-semibold'>Total amount</h1>
                <h1 className='font-bold text-lg text-green-500 flex items-center'>
                    <BsCurrencyRupee/>{totalAmount}
                </h1>
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

export default cart;


export const getServerSideProps = async ({params}:any) => {
    const userId = params?.userId as string;
    try {
      const backendURL = 'http://127.0.0.1:5000';
  
      const response = await axios.get(`${backendURL}/api/get-cart/${userId}`);
      const cartData = response.data;
  
      return {
        props: { cartData },
      };
    } catch (error) {
      console.error('Error fetching cart data:', error);
      return {
        props: { cartData: [] },
      };
    }
  };