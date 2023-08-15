import { createContext, useEffect, useState } from "react";

type contextState = {
    loading: boolean;
    error: string | null;
    user: number | null;
    personalisedProducts: [] | null;
    topProducts: [] | null;
    similarProducts: [] | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
    setPersonalisedProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setTopProducts: React.Dispatch<React.SetStateAction<[] | null>>;
    setSimilarProducts: React.Dispatch<React.SetStateAction<[] | null>>;
}

export const ProductRecommendationContext = createContext<contextState | null>(null);

export const ProductRecommendationProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<number | null>(59);
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
            setLoading,
            setUser,
            setPersonalisedProducts,
            setTopProducts,
            setSimilarProducts
        }}>
        {children}
        </ProductRecommendationContext.Provider>
    );
}