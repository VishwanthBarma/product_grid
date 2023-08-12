import { useRouter } from "next/router";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { ProductRecommendationContext } from "../../Context/ProductRecommendationContext";

export default function Header(){
    const router = useRouter();
    const { setLoading }: any = useContext(ProductRecommendationContext);
    return(
        <header className="sticky top-0 z-50 bg-neutral-100 p-3 px-60 items-center flex justify-between shadow-neutral-300 shadow-sm">
            <h1 className="font-bold text-xl">LOGO</h1>
            <div className="w-1/2 rounded-xl bg-neutral-200 flex justify-between items-center">
                <input className="p-2 py-3 w-1/2 rounded-xl bg-neutral-200 font-semibold outline-none" placeholder="Search Products"></input>
                {/* Search Function: onClick */}
                <div className="mr-4 font-bold text-neutral-800 hover:bg-black text-xl">
                    <BiSearchAlt />
                </div>
            </div>
            <div className="flex items-center space-x-1">
                <CgProfile className="text-2xl"/>
                <h1 className="font-bold">User01</h1>
            </div>
            <div className="flex items-center space-x-1">
                <AiOutlineShoppingCart className="text-2xl"/>
                <h1 className="font-bold">Cart</h1>
            </div>
        </header>
    )
}