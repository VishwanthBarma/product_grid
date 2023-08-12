import Header from "./Header";
import SyncLoader from "react-spinners/SyncLoader";
import { useContext } from "react";
import { ProductRecommendationContext } from "../../Context/ProductRecommendationContext";

export default function Layout({children}: any){
    const { loading }: any = useContext(ProductRecommendationContext);

    return(
        <div>
            {
                loading ?
    
                <div className="flex items-center justify-center w-screen h-screen">
                    <SyncLoader color="rgb(14 165 233)" size={30} />
                </div>

                :
    
                <div className="flex flex-col h-screen">
                    <Header />
                    <main className="px-32">{children}</main>
                </div>
            }
        </div>
    )
}