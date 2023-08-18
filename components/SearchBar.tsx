import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { ProductRecommendationContext } from '../Context/ProductRecommendationContext';
import { useRouter } from 'next/router';

function SearchBar() {
    const { products }: any = useContext(ProductRecommendationContext);

    const categories = Array.from(new Set(products?.map((product:any) => product.category)));

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const [isCategoryClicked, setIsCategoryClicked] = useState(false);

    useEffect(() => {
        const filteredResults = products?.filter((product: any) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sub_category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchTerm, products]);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setDropdownVisible(false);
            }
        }

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setDropdownVisible(true);
        setIsCategoryClicked(false);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(searchTerm == ''){
            return;
        }
        router.push(`/search/products/search?query=${encodeURIComponent(searchTerm)}`);
    };

    const handleDropdownItemClick = (result: any) => {
        setSearchTerm(result.product_name);
        setDropdownVisible(false);
    };

    const handleCategoryClick = () => {
        setIsCategoryClicked(!isCategoryClicked);
    }

    return (
        <form onSubmit={handleSearchSubmit} className="relative w-1/2 rounded-xl bg-neutral-100 flex">
            <div onClick={() => handleCategoryClick()} className='w-40 flex items-center justify-center font-bold border-2 bg-neutral-200 rounded-l-xl cursor-pointer'>
                <div className='text-xs flex items-center'>All categories
                    <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </div>
            </div>
            <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for products..."
                className="w-full rounded-xl bg-neutral-100 p-3 outline-none font-semibold"
            />
            {isDropdownVisible && searchResults?.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 py-1 top-12 bg-white border border-gray-300 rounded-xl shadow-xl max-h-[600px] overflow-y-scroll w-full"
                >
                    {searchResults?.map((result) => (
                        <div
                            key={result?.product_id}
                            onClick={() => handleDropdownItemClick(result)}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                            {result.product_name}
                        </div>
                    ))}
                </div>
            )}

            {
                isCategoryClicked&&
                <div className='absolute z-10 mt-1 py-1 p-3 top-12 w-42 bg-white border border-gray-300 rounded-xl shadow-xl overflow-y-scroll'>
                    {
                        categories.map((category:any) => (
                            <h1 onClick={() =>{
                                router.push(`/search/category/search?query=${encodeURIComponent(category)}`)
                                setIsCategoryClicked(false);
                            }} className='text-lg my-1 hover:text-sky-600 cursor-pointer'>{category}</h1>
                        ))
                    }
                </div>
            }

            <button type='submit' className='pr-4'>
                <BiSearchAlt className='text-2xl'/>
            </button>
        </form>
    );
}

export default SearchBar;
