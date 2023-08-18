import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { ProductRecommendationContext } from '../../../Context/ProductRecommendationContext';
import Product from '../../../components/Product';

const SearchProductsPage = () => {
    const { products }: any = useContext(ProductRecommendationContext);
    const router = useRouter();

    // Get the search query parameter from the URL
    const { query }:any = router.query;

    // Filter products based on the search query
    const filteredProducts = products?.filter((product: any) =>
        product.product_name.toLowerCase().includes(query?.toLowerCase()) ||
        product.category.toLowerCase().includes(query?.toLowerCase()) ||
        product.sub_category.toLowerCase().includes(query?.toLowerCase())
    );


    return (
        <div className='flex flex-col p-4'>
            <h1 className='font-bold text-2xl mb-4'>Search Results</h1>
            <div className="grid grid-cols-4 gap-4 place-content-center">

            {
                filteredProducts?.map((product: any) => (<Product
                key={product?.product_id}
                image={product?.images}
                rating={product?.avg_rating}  
                name={product?.product_name}
                description={product?.description}
                price={product?.price}
                stock={product?.stock}
                productId = {product?.product_id}
                original_price = {product?.original_price}
                discount = {product?.discount}
                    />))
            }

        </div>
        </div>
    );
};

export default SearchProductsPage;
