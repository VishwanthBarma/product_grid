import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ProductRecommendationContext } from '../../Context/ProductRecommendationContext';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';

function User({usersData}: any) {

  const [newUsers, setNewUsers] = useState([]);

  const {setUser,
     setPersonalisedProducts,
     setTopProducts, 
     setUserName,
     user,
     userName, 
     userImage,
     userEmail,
     userPhone,
     setUserEmail,
     setUserPhone,
     setUserImage,
     setCartData,
     setSimilarProducts}: any = useContext(ProductRecommendationContext)


  useEffect(() => {
    fetchNewUsers();
  }, [])


  const fetchNewUsers = async() => {
    const response = await axios.get('http://127.0.0.1:5000/api/all-user-details');
    const newUsers = response.data;
    const newUsersData = newUsers.filter((person:any) => person.user_id > 100 && person.user_id != user)
    setNewUsers(newUsersData);
  }

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("example@gmail.com")
  const [newUserPhone, setNewUserPhone] = useState("+91-xx-56-xx2789")
  const [newUserImage, setNewUserImage] = useState("https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png")

  const router = useRouter();

  const changeUser = (person: any) => {
    setUser(person?.user_id);
    setPersonalisedProducts(null);
    setTopProducts(null);
    setSimilarProducts(null);
    setUserName(person?.user_name);
    setUserImage(person?.user_image);
    setUserEmail(person?.user_email);
    setUserPhone(person?.user_mobile);
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
      setNewUserEmail("example@gmail.com")
      setNewUserName("")
      setNewUserPhone("+91-xx-56-xx2789")
      setNewUserImage("https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png")
      fetchNewUsers();
      toast.success('Successfully toasted!');
    }catch(error){
      console.log("Error:", error);
    }
  }

  return (
    <div className='p-5 flex space-x-3'>
      <Toaster
        toastOptions={{
          style: {
            border: '2px solid #0ea5e9',
            padding: '16px',
            color: '#0ea5e9',
          },
        }}
        position="top-center"
        reverseOrder={true}
      />
        <div className='w-1/2 flex flex-col items-center space-y-3'>
          <div className='flex flex-col items-center space-y-2 bg-white p-3 rounded-xl w-full shadow-lg h-[480px]'>
            <img className='h-80 w-80 rounded-full items-center border-2 border-sky-500 p-2' src={userImage}></img>
            <h1 className='font-bold text-2xl text-sky-500'>{userName}</h1>
            <h1>{userEmail}</h1>
            <h1>{userPhone}</h1>
          </div>

          <div className='rounded-xl text-center bg-white w-full flex flex-col p-3 px-5 shadow-lg h-[380px]'>
            <h1 className='font-bold text-xl'>Register New User</h1>
              <form onSubmit={handleNewUserSubmit} className='flex flex-col space-y-4 mt-8'>
                <label className='font-semibold'>
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

                <button type='submit' className='bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold p-2 rounded-xl'>Create User</button>

              </form>
              
          </div>

        </div>
        <div className='flex flex-col w-1/2 space-y-3'>

          <div className=' bg-white rounded-xl p-5 space-y-3  shadow-lg'>
              <h1 className='font-bold text-xl text-neutral-700 text-center'>Registered Users</h1>
              <div className='flex flex-wrap overflow-y-scroll h-[400px]'>
                {
                  usersData?.map((person:any) => ( person.user_id != user.user_id &&
                    <button onClick={() => changeUser(person)} className='font-semibold bg-neutral-200/70 p-2 w-fit rounded-xl m-2 hover:text-neutral-300 hover:bg-neutral-700 active:bg-black'>{person?.user_name}</button>
                  ))
                }
              </div>
          </div>

          <div className=' bg-white rounded-xl p-5 space-y-3 shadow-lg'>
              <h1 className='font-bold text-xl text-neutral-700 text-center'>New Registered Users</h1>
              <div className='flex flex-wrap overflow-y-scroll max-h-[300px]'>
                {
                  newUsers?.map((person:any) => ( person.user_id != user.user_id &&
                    <button onClick={() => changeUser(person)} className='font-semibold bg-neutral-200/70 p-2 w-fit rounded-xl m-2 h-fit hover:text-neutral-300 hover:bg-neutral-700 active:bg-black'>{person?.user_name}</button>
                  ))
                }
              </div>
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
    const users = response.data;

    const usersData = users.filter((user:any) => user.user_id <= 100);

    // Find the user based on userId
    // const user = usersData.find((user: any) => user.user_id.toString() === userId) || null;

    return {
      props: { usersData },
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return {
      props: { user: null, usersData: null },
    };
  }
};
