import React from 'react'

function user() {
  return (
    <div className='p-5 flex'>
        <div className='w-1/2 flex flex-col items-center space-y-2'>
            <img className='h-80 w-80 rounded-full items-center' src='https://randomuser.me/api/portraits/men/1.jpg'></img>
            <h1 className='font-bold text-2xl text-neutral-700'>Holly_Acosta</h1>
            <h1>example@gmail.com</h1>
            <h1>9966440677</h1>
        </div>
        <div className='w-1/2 h-[900px] bg-neutral-100 rounded-xl p-5 space-y-3'>
            <h1 className='font-bold text-xl text-neutral-700 text-center'>Registered Users</h1>
            <div className='flex flex-wrap'>
                <h1 className='font-semibold bg-neutral-200 p-2 w-fit rounded-xl m-2'>Hima_charan</h1>
                <h1 className='font-semibold bg-neutral-200 p-2 w-fit rounded-xl m-2'>Vishwanth</h1>
            </div>
        </div>
    </div>
  )
}

export default user