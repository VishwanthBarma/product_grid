import axios from 'axios';
import React, { useContext, useState } from 'react'
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
     setCartData,
     setSimilarProducts}: any = useContext(ProductRecommendationContext)

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("example@gmail.com")
  const [newUserPhone, setNewUserPhone] = useState("+91 xx-56-xx2789")
  const [newUserImage, setNewUserImage] = useState("https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png")

  const router = useRouter();

  const changeUser = (person: any) => {
    setUser(person.user_id);
    setPersonalisedProducts(null);
    setTopProducts(null);
    setSimilarProducts(null);
    setUserName(person?.user_name);
    setUserImage(person?.user_image);
    setCartData([]);
    router.push('/');
  }

  const handleNewUserSubmit = async(e:any) => {
    e.preventDefault();
    
    const response = await axios.get("http://127.0.0.1:5000/api/get-last-user-id");

    const new_user_id = response.data.lastUserId + 1;

    try{
      const newUserResponse = await axios.post("http://127.0.0.1:5000/api/register-new-user", {
        user_id : new_user_id,
        user_name: newUserName,
        user_email: newUserEmail,
        user_mobile: newUserPhone,
        user_image: newUserImage
      })
  
      if(newUserResponse.data.success){
        console.log("New user registered successfully.")
      }
    }catch(error){
      console.log("Error:", error);
    }
  }

  return (
    <div className='p-5 flex space-x-3'>
        <div className='w-1/2 flex flex-col items-center space-y-3'>
          <div className='flex flex-col items-center space-y-2 bg-white p-3 rounded-xl w-full shadow-lg'>
            <img className='h-80 w-80 rounded-full items-center border-2 border-sky-500 p-2' src={user?.user_image}></img>
            <h1 className='font-bold text-2xl text-sky-500'>{user?.user_name}</h1>
            <h1>{user?.user_email}</h1>
            <h1>{user?.user_mobile}</h1>
          </div>

          <div className='rounded-xl bg-white w-full flex flex-col p-3 px-5 shadow-lg'>
            <h1 className='font-bold text-xl'>Register New User</h1>
              <form onSubmit={handleNewUserSubmit} className='mt-3 flex flex-col space-y-3'>
                <label className='font-semibold w-2/4'>
                  Name:
                  <input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className='ml-5 p-2 rounded-xl bg-neutral-100' required></input>
                </label>

                <label className='font-semibold'>
                   Email:
                  <input value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className='ml-5 p-2 rounded-xl bg-neutral-100'></input>
                </label>

                <label className='font-semibold'>
                  Phone:
                  <input value={newUserPhone} onChange={(e) => setNewUserPhone(e.target.value)} className='ml-5 p-2 rounded-xl bg-neutral-100'></input>
                </label>

                <label className='font-semibold'>
                  Image URL:
                  <input value={newUserImage} onChange={(e) => setNewUserImage(e.target.value)} className='ml-5 p-2 rounded-xl bg-neutral-100'></input>
                </label>

                <button type='submit' className='bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold my-5 p-1 rounded-xl'>Create User</button>

              </form>
          </div>

        </div>
        <div className='w-1/2 h-[900px] bg-white rounded-xl p-5 space-y-3 overflow-y-scroll shadow-lg'>
            <h1 className='font-bold text-xl text-neutral-700 text-center'>Registered Users</h1>
            <div className='flex flex-wrap'>
              {
                usersData?.map((person:any) => ( person.user_id != user.user_id &&
                  <button onClick={() => changeUser(person)} className='font-semibold bg-neutral-200/70 p-2 w-fit rounded-xl m-2 hover:text-neutral-300 hover:bg-neutral-700 active:bg-black'>{person?.user_name}</button>
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
