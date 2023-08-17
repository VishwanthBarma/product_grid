import React, { useContext, useState } from 'react'
import CartProduct from '../../components/CartProduct'
import axios from 'axios';
import { BsCurrencyRupee } from 'react-icons/bs';
import { ProductRecommendationContext } from '../../Context/ProductRecommendationContext';
import { SyncLoader } from 'react-spinners';
import { useRouter } from 'next/router';

function cart({cartData}: any) {

    const router = useRouter();

    const {user, setCartData}:any = useContext(ProductRecommendationContext);

    const totalPrice = cartData.reduce((total:any, item:any) => total + item.price, 0).toFixed(2);
    const totalDiscount = cartData.reduce((total:any, item:any) => total + item.discount, 0).toFixed(2);
    const totalAmount = totalPrice - totalDiscount;

    const [price, setPrice] = useState(totalPrice);
    const [discount, setDiscount] = useState(totalDiscount);
    const [amount, setAmount] = useState(totalAmount);
    const [orderLoading, setOrderLoading] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const placeOrder = async() => {
        setOrderLoading(true);
        try {
            const user_id = user;
            const product_ids = cartData.map((item: any) => item.product_id);

            console.log(user_id)
            console.log(product_ids);
      
            const response = await axios.post('http://127.0.0.1:5000/api/update-order-status', {
              user_id,
              product_ids,
            });
      
            if (response.status === 200) {
              console.log('Order placed successfully');
              setIsOrdered(true);
              setDiscount(0);
              setPrice(0);
              setAmount(0);
              setCartData([]);
            } else {
              console.error('Error placing order');
            }
          } catch (error) {
            console.log("Comming from here...")
            console.error('An error occurred:', error);
        }
        setOrderLoading(false);
    }

  return (
    <div className='flex space-x-2 m-2 p-2'>
        <div className='w-3/4 bg-white p-5 rounded-xl'>
            <h1 className='font-bold text-2xl mb-3 border-b-2'>Shopping Cart</h1>
            <div className='flex flex-col max-h-[calc(100vh-200px)] overflow-y-scroll space-y-2'>

            {
                cartData.length != 0 && !isOrdered ?
                cartData.map((product:any) => <CartProduct image={product.images} name={product.product_name} price={product.price} stock={product.stock} />)
                :
                <>
                    <h1 className='font-semibold text-center bg-neutral-2100 p-2 rounded-xl'>No Products In Cart</h1>
                    <button onClick={() => router.push("/personalisedproducts")} className='font-bold mt-2 text-sky-500 hover:text-sky-600 active:text-sky-400'>Continue Shopping</button>
                </>
            }

            </div>
        </div>

        <div className='w-1/4 bg-white rounded-xl flex flex-col space-y-2 p-3 h-full'>
            <h1 className='font-bold text-neutral-500 text-center text-lg'>Price Details</h1>
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <h1>Price</h1>
                    <h1 className='flex items-center'>
                        <BsCurrencyRupee/>{price}
                    </h1>
                </div>
                <div className='flex justify-between'>
                    <h1>Discount</h1>
                    <h1 className='flex items-center'>
                        <BsCurrencyRupee/>{discount}
                    </h1>
                </div>
            </div>
            <div className='flex justify-between bg-slate-100 border-2 p-2 rounded-xl items-center'>
                <h1 className='font-semibold'>Total amount</h1>
                <h1 className='font-bold text-lg text-green-500 flex items-center'>
                    <BsCurrencyRupee/>{amount}
                </h1>
            </div>
            <div className='flex flex-col space-y-1 bg-slate-200 rounded-xl p-3 justify-center items-center font-semibold text-sm'>
                <h1>Safe and Secure Payments</h1>
                <h1>Easy Returns</h1>
                <h1>100% Authentic products.</h1>
            </div>

            {
                !orderLoading?
                    !isOrdered ?
                    <button onClick={() => placeOrder()} className='bg-sky-500 text-white p-2 rounded-xl'>Place Order</button>
                    :
                    <h1  className='border-2 border-sky-500 text-sky-600 p-2 rounded-xl font-semibold text-center'>Order Placed Successfully</h1>
                :
                <div className='flex items-center p-3 justify-center'>
                  <SyncLoader color="rgb(14 165 233)" size={15} />
                </div>
            }
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