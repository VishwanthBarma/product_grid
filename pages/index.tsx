import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ProductRecommendationContext } from '../Context/ProductRecommendationContext';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import Slideshow from '../components/SlideShow';

const Home: NextPage = () => {
  const router = useRouter();
  const [recLoading, setRecLoading] = useState(false);
  const [fetchMessage, setFetchMessage] = useState("");

  const { user,
          personalisedProducts,
          setPersonalisedProducts,
          topProducts,
          setTopProducts,
          similarProducts,
          setSimilarProducts,
          cartData,
          setCartData,
          setWishlistData,
          userName
          }: any = useContext(ProductRecommendationContext);

  const userId = user;

  const getRecommendations = async() => {
    setRecLoading(true)
    try {
      setFetchMessage("Generating Personlised Products...")
      const personalisedProductsFetch = await axios.get(`http://127.0.0.1:5000/api/recommended-products/${userId}`);
      setPersonalisedProducts(personalisedProductsFetch.data);

      setFetchMessage("Genrating Top Prodcuts...")
      const topProductFetch = await axios.get(`http://127.0.0.1:5000/api/top-products/${userId}`);
      setTopProducts(topProductFetch.data);

      setFetchMessage("Generating Similar User Products...")
      const similarProductsFetch = await axios.get(`http://127.0.0.1:5000/api/similar-products/${userId}`)
      setSimilarProducts(similarProductsFetch.data);

      const cartDataFetch = await axios.get(`http://127.0.0.1:5000/api/get-cart/${userId}`)
      setCartData(cartDataFetch.data);

      const wishlistDataFetch = await axios.get(`http://127.0.0.1:5000/api/get-wishlist/${userId}`)
      setWishlistData(wishlistDataFetch.data);


    } catch (error) {
      console.error('Error fetching recommended products:', error);
    }
    setRecLoading(false)
  }

  return (
    <div className='m-2 p-3 pb-10'>
      <Head>
        <title>ProductRecommendation</title>
        <meta name="Personalized Product Recommendation System" content="Generated by create next app" />
      </Head>

      <div className='my-5 shadow-lg mb-10'>
        <Slideshow />
      </div>

      {
        !(similarProducts && personalisedProducts && topProducts) ?

        <div className='flex flex-col items-center justify-center bg-white rounded-xl p-5 shadow-lg'>
          {
            recLoading ?
            <div className='felx flex-col justify-center text-center'>
              <SyncLoader color="rgb(14 165 233)" size={20} />
              <div className='items-center flex space-x-2 m-3 bg-neutral-100 p-2 px-10 rounded-xl mt-4'>
                <h1 className='animate-spin'>.</h1>
                <h1 className='font-semibold'>{fetchMessage}</h1>
              </div>
            </div>
            :
            <button onClick={getRecommendations} className='text-center font-semibold bg-sky-500 p-2 rounded-xl px-5 text-white hover:shadow-lg active:bg-sky-600'>Get Recommendations</button>
          }
        </div>

        :

        <div className='rounded-xl flex flex-col'>
          <div className='bg-sky-500 rounded-xl p-2'>
            <h1 className='font-bold text-center text-lg text-white'>RECOMMENDATIONS</h1>
          </div>
          <div className='flex space-x-5 mt-2'>

          <div onClick={() => router.push('/personalisedproducts')} className='bg-white rounded-xl w-1/3 p-3 cursor-pointer hover:shadow-xl shadow-lg'>
              <h1 className='text-center font-semibold mb-3 text-xl bg-neutral-100 p-1 rounded-xl'>Pick Up Where You Left Off</h1>

              <div className="grid grid-cols-2 gap-4 place-content-center mt-3">
              {
                  personalisedProducts?.slice(0,4).map((item:any) => (
                    <div className='flex justify-center items-center border-2 rounded-xl p-2'>
                        <img className="h-40 max-w-full rounded-lg" src={item?.image} alt="" />
                    </div>
                  ))
                }
              </div>
            </div>


            <div onClick={() => router.push('/topproducts')} className='bg-white rounded-xl w-1/3 p-3 cursor-pointer hover:shadow-xl shadow-lg'>
              <h1 className='text-center font-semibold mb-3 text-xl bg-neutral-100 p-1 rounded-xl'>Suggested Products</h1>

              <div className="grid grid-cols-2 gap-4 place-content-center mt-3">
              {
                  topProducts?.slice(0,4).map((item:any) => (
                    <div className='flex justify-center items-center border-2 rounded-xl p-2'>
                        <img className="h-40 max-w-full rounded-lg" src={item?.image} alt="" />
                    </div>
                  ))
                }
              </div>
            </div>


            <div onClick={() => router.push('/similaruserproducts')} className='bg-white rounded-xl w-1/3 p-3 cursor-pointer hover:shadow-xl shadow-lg'>
              <h1 className='text-center font-semibold mb-3 text-xl bg-neutral-100 p-1 rounded-xl'>You May Like</h1>

              <div className="grid grid-cols-2 gap-4 place-content-center mt-3">
              {
                  similarProducts?.slice(0,4).map((item:any) => (
                    <div className='flex justify-center items-center border-2 rounded-xl p-2'>
                        <img className="h-40 max-w-full rounded-lg" src={item?.image} alt="" />
                    </div>
                  ))
                }
              </div>
            </div>


          </div>

        </div>
      }

    </div>
  )
}

export default Home;
