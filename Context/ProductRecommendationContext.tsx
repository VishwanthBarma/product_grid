import { createContext, useEffect, useState } from "react";

type contextState = {
    loading: boolean;
    error: string | null;
    user: number | null;
    recommendedProducts: [] | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
    setRecommendedProducts: React.Dispatch<React.SetStateAction<[] | null>>;
}

export const ProductRecommendationContext = createContext<contextState | null>(null);

export const ProductRecommendationProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<number | null>(1);
    const [recommendedProducts, setRecommendedProducts] = useState<[]| null>(null);

    return (
        <ProductRecommendationContext.Provider value= {{
            user,
            loading,
            error,
            recommendedProducts,
            setLoading,
            setUser,
            setRecommendedProducts
        }}>
        {children}
        </ProductRecommendationContext.Provider>
    );
}