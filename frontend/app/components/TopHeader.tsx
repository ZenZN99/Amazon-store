"use client";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { useStore } from "../context/UseStore";
import Link from "next/link";
import { useEffect, useState } from "react";
const TopHeader = () => {
  const { cartItem, favoriteItem } = useStore();
    const [mounted, setMounted] = useState(false);

      useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null; 

  return (
    <header className="navbar bg-gray-800 flex items-center justify-between px-20 py-2">
      <div>
        <img src="/images/logo.png" alt="logo" className="w-40" />
      </div>
      <div>
        <SearchBox />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Link className="text-white text-[30px]" href="/cart">
            <TiShoppingCart />
          </Link>
          <span className="absolute bottom-5 left-5 w-5 h-5 bg-orange-500 flex items-center justify-center rounded-full text-white">
            {cartItem.length}
          </span>
        </div>
        <div className="relative">
          <Link className="text-white text-[30px]" href="/favorite">
            <FaRegHeart />
          </Link>
          <span className="absolute bottom-5 left-5 w-5 h-5 bg-orange-500 flex items-center justify-center rounded-full text-white">
            {favoriteItem.length}
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
