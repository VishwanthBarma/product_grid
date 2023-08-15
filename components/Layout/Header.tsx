import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { ProductRecommendationContext } from "../../Context/ProductRecommendationContext";
import Link from "next/link";

export default function Header(){
    const router = useRouter();
    const { setLoading, user, userName, userImage }: any = useContext(ProductRecommendationContext);

    const userId = user;

    const isCartPage = router.pathname == '/cart';
    const isUserPage = router.pathname == `/user/${userId}`;


    return(
        <div className="sticky top-0 z-50 bg-neutral-100 p-2 px-60 items-center flex justify-between shadow-neutral-300 shadow-sm">

            <Link href={"/"}>
                <h1 className="font-bold text-xl">LOGO</h1>
            </Link>

            <div className="w-1/2 rounded-xl bg-neutral-200 flex justify-between items-center">
                <input className="p-2 py-3 w-1/2 rounded-xl bg-neutral-200 font-semibold outline-none" placeholder="Search Products"></input>
                {/* Search Function: onClick */}
                <div className="mr-4 font-bold text-neutral-800 hover:bg-black text-xl">
                    <BiSearchAlt />
                </div>
            </div>

            <Link href={`/user/${userId}`} className={`${isUserPage && 'text-sky-500'} flex items-center space-x-1 cursor-pointer`}>
                <img className="h-10 w-10 rounded-full" src={ userImage }></img>
                <h1 className="font-bold">{userName}</h1>
            </Link>

            <Link href={"/cart"} className={`${isCartPage && 'text-sky-500'} flex items-center space-x-1 cursor-pointer`}>
                <AiOutlineShoppingCart className="text-2xl"/>
                <h1 className="font-bold">Cart</h1>
            </Link>
        </div>
    )
}