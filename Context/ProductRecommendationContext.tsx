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
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
    setPersonalisedProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setTopProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setSimilarProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
    setUserImage: React.Dispatch<React.SetStateAction<string | null>>;
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