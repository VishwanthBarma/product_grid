import axios from "axios";
import { createContext, useEffect, useState } from "react";

type contextState = {
    loading: boolean;
    error: string | null;
    user: number | null;
    userName: string | null;
    userImage: string | null;
    personalisedProducts: [] | null;
    topProducts: [] | null;
    similarProducts: [] | null;
    cartData: [] | null;
    wishlistData: [] | null;
    products: [] | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
    setPersonalisedProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setTopProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setSimilarProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
    setUserImage: React.Dispatch<React.SetStateAction<string | null>>;
    setCartData: React.Dispatch<React.SetStateAction<[] | null>>;
    setWishlistData: React.Dispatch<React.SetStateAction<[] | null>>;
    setProducts: React.Dispatch<React.SetStateAction<[] | null>>;
}

export const ProductRecommendationContext = createContext<contextState | null>(null);

export const ProductRecommendationProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<number | null>(1);
    const [userName, setUserName] = useState<string | null>("Holly_Acosta");
    const [userImage, setUserImage] = useState<string | null>("https://randomuser.me/api/portraits/men/1.jpg");
    const [personalisedProducts, setPersonalisedProducts] = useState<[]| null>(null);
    const [topProducts, setTopProducts] = useState<[]| null>(null);
    const [similarProducts, setSimilarProducts] = useState<[]| null>(null);
    const [cartData, setCartData] = useState<[] | null>(null);
    const [wishlistData, setWishlistData] = useState<[] | null>(null);
    const [products, setProducts] = useState<[]|null>(null);

    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const response = await axios.get('http://127.0.0.1:5000/api/all-product-details');
                const products = response.data;
                setProducts(products);
            }catch (error){
                console.log(error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <ProductRecommendationContext.Provider value= {{
            user,
            loading,
            error,
            personalisedProducts,
            topProducts,
            similarProducts,
            userName,
            userImage,
            cartData,
            wishlistData,
            products,
            setProducts,
            setCartData,
            setWishlistData,
            setLoading,
            setUser,
            setPersonalisedProducts,
            setTopProducts,
            setSimilarProducts,
            setUserName,
            setUserImage,
        }}>
        {children}
        </ProductRecommendationContext.Provider>
    );
}