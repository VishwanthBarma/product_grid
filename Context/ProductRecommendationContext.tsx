import { createContext, useEffect, useState } from "react";

type contextState = {
    loading: boolean;
    error: string | null;
    user: number | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ProductRecommendationContext = createContext<contextState | null>(null);

export const ProductRecommendationProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<number | null>(1);

    return (
        <ProductRecommendationContext.Provider value= {{
            user,
            loading,
            error,
            setLoading,
            setUser,
        }}>
        {children}
        </ProductRecommendationContext.Provider>
    );
}