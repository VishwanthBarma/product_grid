import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { ProductRecommendationContext } from "../../Context/ProductRecommendationContext";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import SearchBar from "../SearchBar";

export default function Header(){
    const router = useRouter();
    const { setLoading, user, userName, userImage, cartData }: any = useContext(ProductRecommendationContext);
    const [menuClicked, setMenuClicked] = useState(false);

    const cartNumber = cartData?.length

    const userId = user;

    const isCartPage = router.pathname == '/cart/[userId]';
    const isUserPage = router.pathname == '/user/[userId]';

    return(
        <div className="sticky top-0 z-50 bg-white p-2 px-60 items-center flex justify-between shadow-neutral-300 shadow-sm">

            <Link href={"/"}>
                <img className="h-10" src="/images/logo.png" alt="Logo" />
            </Link>


            <SearchBar />


            <Link href={`/cart/${userId}`} className={`${isCartPage && 'text-sky-500'} flex relative items-center space-x-1 cursor-pointer`}>
                <AiOutlineShoppingCart className="text-2xl"/>
                <h1 className="font-bold">Cart</h1>
                {
                    cartNumber > 0 &&
                    <div className="flex items-center justify-center bg-rose-500 rounded-full h-5 w-5">
                        <h1 className="font-bold text-white text-xs">{cartNumber}</h1>
                    </div>
                }
            </Link>

            <Link href={`/user/${userId}`} className={`${isUserPage && 'text-sky-500'} flex items-center space-x-1 cursor-pointer`}>
                <img className={`h-10 w-10 rounded-full ${isUserPage && "border-2"} border-sky-500`} src={ userImage }></img>
                <h1 className="font-bold">{userName}</h1>
            </Link>


            <div className="relative">
                <HiMenu onClick={() => setMenuClicked(!menuClicked)} className="text-2xl font-bold cursor-pointer"/>
                {
                    menuClicked && 
                    <div className="absolute top-12 right-0 bg-white border-2 text-white p-10 w-max rounded-xl items-center text-center shadow-2xl">
                    <ul onClick={() => setMenuClicked(false)} className="space-y-5 text-neutral-700">
                        <li className="bg-slate-200 rounded-xl p-2 hover:bg-slate-100">
                        <Link href={`/wishlist/${userId}`}>
                            <h1 className="hover:text-gray-700 font-bold text-xl">WishList</h1>
                        </Link>
                        </li>
                        <li className="bg-slate-200 rounded-xl p-2 hover:bg-slate-100">
                        <Link href={`/order/${userId}`}>
                            <h1 className="hover:text-gray-700 font-bold text-xl">Order History</h1>
                        </Link>
                        </li>
                    </ul>
                    </div>
                }
            </div>

        </div>
    )
}