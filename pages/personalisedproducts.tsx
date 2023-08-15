import React, { useContext, useState } from 'react'
import Product from '../components/Product'
import { ProductRecommendationContext } from '../Context/ProductRecommendationContext';

function PersonalisedProducts() {
    const {personalisedProducts}: any = useContext(ProductRecommendationContext);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

    const categories = Array.from(new Set(personalisedProducts.map((product:any) => product.category)));
    const subcategories = Array.from(new Set(personalisedProducts.map((product: any) => product.sub_category)));

    const filteredProducts = personalisedProducts.filter((product:any) => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
        }
        if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.sub_category)) {
        return false;
        }
        return true;
    });

  return (
    <div className='flex flex-col p-5 space-y-5'>
        <h1 className='font-bold text-xl'>Products Based On Category</h1>

        <div className='flex space-x-5'>
            <div className=' bg-neutral-100 w-1/5 p-5 rounded-xl max-h-[800px] h-full'>
                <h1 className='font-bold  text-lg mb-3 border-b-2 border-black'>Select Category</h1>
                <div className='overflow-y-scroll text-neutral-700 flex flex-col items-start space-y-4 font-semibold text-lg'>
                    


                <div>
                    <label className='text-black'>Categories:</label>
                    <div className='flex flex-col'>

                        {categories.map((category: any) => (
                        <label key={category}>
                            <input
                            className='mr-1'
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={e => {
                                const selectedCategory = e.target.value;
                                setSelectedCategories(prevCategories =>
                                prevCategories.includes(selectedCategory)
                                    ? prevCategories.filter(category => category !== selectedCategory)
                                    : [...prevCategories, selectedCategory]
                                );
                            }}
                            />
                            {category}
                        </label>
                            ))}
                    </div>
                    </div>
                    <div className=''>
                        <label className='text-black'>Subcategories:</label>
                        <div className='flex flex-col'>
                            {subcategories.map((subcategory:any) => (
                            <label key={subcategory}>
                                <input
                                type="checkbox"
                                className='mr-1'
                                value={subcategory}
                                checked={selectedSubcategories.includes(subcategory)}
                                onChange={e => {
                                    const selectedSubcategory = e.target.value;
                                    setSelectedSubcategories(prevSubcategories =>
                                    prevSubcategories.includes(selectedSubcategory)
                                        ? prevSubcategories.filter(subcategory => subcategory !== selectedSubcategory)
                                        : [...prevSubcategories, selectedSubcategory]
                                    );
                                }}
                                />
                                {subcategory}
                            </label>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
            <div className="grid grid-cols-3 gap-4 w-4/5 place-content-center">

          {
            filteredProducts?.map((product: any) => (<Product
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

        

    </div>
  )
}

export default PersonalisedProducts;