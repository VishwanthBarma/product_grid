import React from 'react'

function ProductPage() {
  return (
    <div className="flex p-6">
  {/* Product Image */}
    <div className="w-1/3">
        <img src="https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India-1200x675.jpg" alt="Product" className="max-w-full h-[600px] object-fit rounded-xl" />
    </div>
    
    {/* Product Content */}
    <div className="w-2/3 px-6">
        <h2 className="text-xl font-semibold text-neutral-400">Product Name</h2>
        <h1 className='font-semibold text-lg'>lakjsdflj lakjdflkjas lkjadlkfjsdl fjalkdfj s</h1>
        <p className="text-gray-600 text-md mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec posuere velit, nec fermentum libero.
        </p>
        <h1>Seller: <span className='font-semibold text-neutral-700'>ManavBooks</span></h1>
        <h1>Seller Rating: <span className='font-semibold text-neutral-700'>4.20</span></h1>

        <h1 className='text-rose-500 font-semibold mt-3'>Hurry up! 2 left</h1>

        <div className="flex items-center mb-2">
        <span className="text-2xl font-semibold text-green-500">$99.99</span>
        <span className="text-gray-400 ml-2 line-through">$129.99</span>
        <span className="font-semibold text-cyan-500 ml-2">78% off</span>
        </div>

        <div className='flex items-center'>
            <div className='bg-neutral-100 border-2 text-sm p-1 flex rounded-xl space-x-2'>
                <h1>Reviews</h1>
                <h1 className='font-semibold'>230</h1>
            </div>
            <img className='h-5 ml-2' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"></img>
        </div>

        <p className="text-gray-600 text-sm">7 Days Replacement Policy</p>
        
        <div className='flex space-x-4 mt-4'>
            <button className="bg-blue-500 font-semibold text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-600">
            Add to Cart
            </button>
            <button className='p-3 bg-neutral-100 rounded-xl border-2 hover:bg-neutral-200'>Add to Wishlist</button>
        </div>
        <div className="mt-6">
            
        <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
        </div>


        <div className='mt-5 w-2/4'>
            <h1 className='font-semibold text-xl mb-1 text-neutral-600'>Specifications</h1>
            <h1>Sales Package: 1 Mobile Cover | Model Number: ABC1399T37958-Teddy bear Gift Girlie | Designed For: Moto G9 | Brand Color: Multicolor | Pack of: 1</h1>
        </div>
    </div>
    </div>

  )
}

export default ProductPage;