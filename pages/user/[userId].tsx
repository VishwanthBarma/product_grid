import axios from 'axios';
import React, { useContext } from 'react'
import { ProductRecommendationContext } from '../../Context/ProductRecommendationContext';
import { useRouter } from 'next/router';

function User({user, usersData}: any) {

  const {setUser,
     setPersonalisedProducts,
     setTopProducts, 
     setUserName, 
     userName, 
     userImage,
     setUserImage,
     setSimilarProducts}: any = useContext(ProductRecommendationContext)

  const router = useRouter();

  const changeUser = (person: any) => {
    setUser(person.user_id);
    setPersonalisedProducts(null);
    setTopProducts(null);
    setSimilarProducts(null);
    setUserName(person?.user_name);
    setUserImage(person?.user_image);
    router.push('/');
  }

  return (
    <div className='p-5 flex'>
        <div className='w-1/2 flex flex-col items-center space-y-2'>
            <img className='h-80 w-80 rounded-full items-center' src={user?.user_image}></img>
            <h1 className='font-bold text-2xl text-neutral-700'>{user?.user_name}</h1>
            <h1>{user?.user_email}</h1>
            <h1>{user?.user_mobile}</h1>
        </div>
        <div className='w-1/2 h-[900px] bg-neutral-100 rounded-xl p-5 space-y-3 overflow-y-scroll'>
            <h1 className='font-bold text-xl text-neutral-700 text-center'>Registered Users</h1>
            <div className='flex flex-wrap'>
              {
                usersData?.map((person:any) => ( person.user_id != user.user_id &&
                  <button onClick={() => changeUser(person)} className='font-semibold bg-neutral-200 p-2 w-fit rounded-xl m-2 hover:text-neutral-300 hover:bg-neutral-700 active:bg-black'>{person?.user_name}</button>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default User;

export const getServerSideProps = async ({ params }:any) => {
  try {
    const userId = params?.userId as string;
    const response = await axios.get(`http://127.0.0.1:5000/api/all-user-details`);
    const usersData = response.data;

    // Find the user based on userId
    const user = usersData.find((user: any) => user.user_id.toString() === userId) || null;

    return {
      props: { user, usersData },
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return {
      props: { user: null, usersData: null },
    };
  }
};
