import { createContext, useEffect, useState } from "react";

type contextState = {
    loading: boolean;
    error: string | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductRecommendationContext = createContext<contextState | null>(null);

export const ProductRecommendationProvider = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <ProductRecommendationContext.Provider value= {{
            loading,
            error,
            setLoading,
        }}>
        {children}
        </ProductRecommendationContext.Provider>
    );
}