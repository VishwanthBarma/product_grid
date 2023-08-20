import axios from "axios";
import { createContext, useEffect, useState } from "react";

type contextState = {
    loading: boolean;
    error: string | null;
    user: number | null;
    userName: string | null;
    userImage: string | null;
    userPhone: string | null;
    userEmail: string | null;
    personalisedProducts: [] | null;
    topProducts: [] | null;
    similarProducts: [] | null;
    cartData: [] | null;
    wishlistData: [] | null;
    products: [] | null;
    users: [] | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
    setPersonalisedProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setTopProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setSimilarProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
    setUserImage: React.Dispatch<React.SetStateAction<string | null>>;
    setUserPhone: React.Dispatch<React.SetStateAction<string | null>>;
    setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setCartData: React.Dispatch<React.SetStateAction<[] | null>>;
    setWishlistData: React.Dispatch<React.SetStateAction<[] | null>>;
    setProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setUsers: React.Dispatch<React.SetStateAction<[] | null>>;
}

export const ProductRecommendationContext = createContext<contextState | null>(null);

export const ProductRecommendationProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<number | null>(1);
    const [userName, setUserName] = useState<string | null>("Holly_Acosta");
    const [userImage, setUserImage] = useState<string | null>("https://randomuser.me/api/portraits/men/1.jpg");
    const [userPhone, setUserPhone] = useState<string | null>("693-863-0127x801");
    const [userEmail, setUserEmail] = useState<string | null>("holly@gmail.com");
    const [personalisedProducts, setPersonalisedProducts] = useState<[]| null>(null);
    const [topProducts, setTopProducts] = useState<[]| null>(null);
    const [similarProducts, setSimilarProducts] = useState<[]| null>(null);
    const [cartData, setCartData] = useState<[] | null>([]);
    const [wishlistData, setWishlistData] = useState<[] | null>([]);
    const [products, setProducts] = useState<[]|null>([]);
    const [users, setUsers] = useState<[]|null>([]);

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
            userEmail,
            userPhone,
            cartData,
            wishlistData,
            products,
            users,
            setUserEmail,
            setUserPhone,
            setUsers,
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