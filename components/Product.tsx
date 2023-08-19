import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ProductRecommendationContext } from '../Context/ProductRecommendationContext';
import axios from 'axios';


function Product({image, name, description, rating, price, stock, productId, original_price, discount}: any) {
    const router = useRouter();
    const {user: userId, cartData, setCartData, wishlistData, setWishlistData}: any = useContext(ProductRecommendationContext);

    const isProductInCart = cartData?.some((item:any) => item.product_id === productId);
    const isProductInWishlist = wishlistData?.some((item:any) => item.product_id === productId);

    const [inCart, setInCart] = useState(isProductInCart);
    const [inWishlist, setInWishlist] = useState(isProductInWishlist)

    const addToCart = async () => {
        try {
          const response = await axios.post('/api/add-to-cart', {
            userId: userId,
            productId: productId,
          });
    
          if (response.data.success) {
            console.log('Product added to cart successfully');
            setInCart(true);

            const cartDataFetch = await axios.get(`http://127.0.0.1:5000/api/get-cart/${userId}`)
            setCartData(cartDataFetch.data);

          }
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      };

    const addToWishlist = async() => {
        try {
            const response = await axios.post('/api/add-to-wishlist', {
              userId: userId,
              productId: productId,
            });
      
            if (response.data.success) {
              console.log('Product added to wishlist successfully');
              setInWishlist(true);
  
              const wishlistDataFetch = await axios.get(`http://127.0.0.1:5000/api/get-wishlist/${userId}`)
              setWishlistData(wishlistDataFetch.data);
            }

            const updateRelation = await axios.post('http://127.0.0.1:5000/api/update-wishlist-status', {
                user_id: userId,
                product_id: productId,
            })

            if(updateRelation.data.success){
                console.log("Updated userProductRelationDB for wishilisted item.")
            }


          } catch (error) {
            console.error('Error adding product to wishlist:', error);
          }
    }

    const removeFromWishlist = async() => {
        try {
            const response = await axios.post('/api/remove-from-wishlist', {
              userId: userId,
              productId: productId,
            });
      
            if (response.data.success) {
              console.log('Product removed from wishlist successfully');
              setInWishlist(false);
  
              const wishlistDataFetch = await axios.get(`http://127.0.0.1:5000/api/get-wishlist/${userId}`)
              setWishlistData(wishlistDataFetch.data);
            }

            const updateRelation = await axios.post('http://127.0.0.1:5000/api/update-wishlist-status-negative', {
                user_id: userId,
                product_id: productId,
            })

            if(updateRelation.data.success){
                console.log("Updated userProductRelationDB for wishilisted item.")
            }


          }catch (error) {
            console.error('Error adding product to wishlist:', error);
        }
    }

    const handleProductClick = async() => {
        const pathName = router.pathname
        if(pathName == "/search/category/search" || pathName == "/search/products/search"){
            const updateSearchCount = await axios.post('http://127.0.0.1:5000/api/update-search-count', {
                user_id: userId,
                product_id: productId,
            })

            if(updateSearchCount.data.success){
                console.log("Updated Search Count for the product")
            }
        }

        router.push(`/product/${productId}`);
    }
    
  return (
    <div className='bg-white p-3 rounded-xl flex flex-col space-y-1 hover:shadow-lg justify-center h-96'>
        <div onClick={() => handleProductClick()} className='flex flex-col space-y-1  cursor-pointer'>
            <div className='flex justify-center items-center rounded-xl'>
                <img className="h-40 max-w-full rounded-xl" src={ image } alt="" />
            </div>
            <h1 className=''>{`${name.substring(0, 40)}...`}</h1>
            <h1 className='text-xs text-neutral-400'>{`${description.substring(0, 100)}...`}</h1>
        </div>
        <div className='flex space-x-1 items-center bg-green-600 text-white font-bold w-16 justify-center rounded-xl'>
            <h1>{ rating.toFixed(2) }</h1>
            <AiFillStar/>
        </div>

        <div className='flex items-center'>
            <h1 className='flex items-center font-semibold text-lg'>
                <BsCurrencyRupee/>
                { price }
            </h1>
            <span className="text-gray-400 ml-2 line-through flex items-center text-sm">
                <BsCurrencyRupee/>
                {original_price}</span>
            <span className="font-semibold text-green-700 ml-2 text-sm">{discount}% off</span>
        </div>
        <h1 className='text-sm text-red-600'>{ stock }</h1>
        <div className='flex justify-between space-x-2'>
            {
                !inCart ?

                <button onClick={() => addToCart()} className='bg-sky-500 p-2 rounded-xl flex-1 font-sembold text-white hover:bg-sky-400 active:bg-sky-600'>
                    <h1 className='font-bold'>ADD TO CART</h1>
                </button>
                :
                <h1 className='font-bold border-2 border-sky-500 p-2 rounded-xl flex-1 font-sembold text-neutral-700 text-center'>PRODUCT IN CART</h1>
            }


            {
                !inWishlist ?

                <button onClick={() => addToWishlist()} className='bg-neutral-100 p-2 rounded-xl flex font-sembold active:bg-sky-600 border-2 hover:bg-white'>
                    <AiOutlineHeart className='text-pink-500 text-2xl'/>
                </button>
                :

                <button onClick={() => removeFromWishlist()} className='bg-white p-2 rounded-xl flex font-sembold border-2 hover:bg-neutral-100'>
                    <AiFillHeart className='text-pink-500 text-2xl'/>
                </button>

            }
        </div>
    </div>
  )
}

export default Product