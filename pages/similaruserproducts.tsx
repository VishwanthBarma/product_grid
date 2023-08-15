import React, { useContext } from 'react'
import Product from '../components/Product'
import { ProductRecommendationContext } from '../Context/ProductRecommendationContext'

function SimilaruserProducts() {
  const {similarProducts}: any = useContext(ProductRecommendationContext);
  return (
    <div className='flex flex-col p-5 space-y-5'>
        <h1 className='font-bold text-xl'>Products Based On Similar Users</h1>

        <div className="grid grid-cols-4 gap-4 place-content-center">

          {
            similarProducts?.map((product: any) => (<Product
              key={product?.id}
               image={product?.images[0]}
               rating={product?.avg_rating}  
               name={product?.name}
               description={product?.description}
               price={product?.price}
               stock={product?.stock}
               productId = {product?.id}
                />))
          }

        </div>

    </div>
  )
}

export default SimilaruserProducts