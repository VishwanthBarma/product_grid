import React from 'react'
import Product from '../Components/Product'

function CategoryProducts() {
  return (
    <div className='flex flex-col p-5 space-y-5'>
        <h1 className='font-bold text-xl'>Products Based On Category</h1>

        <div className='flex space-x-1'>
            <div className='w-2/4 bg-neutral-200 p-5 rounded-xl max-h-[800px] h-full'>
                <h1 className='font-bold  text-lg mb-3 border-b-2 border-black'>Select Category</h1>
                <div className='overflow-y-scroll text-neutral-700 flex flex-col items-start space-y-1 font-semibold text-lg'>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                    <button>Home</button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>

        

    </div>
  )
}

export default CategoryProducts