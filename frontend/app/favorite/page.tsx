"use client";
import Product from "../components/Product";
import { useStore } from "../context/UseStore";
import { FaHeart } from "react-icons/fa";

const FavoritePage = () => {
  const { favoriteItem } = useStore();
  console.log(favoriteItem);

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold py-3 flex items-center gap-3">
          Your Favorites <FaHeart className="text-[#fb062f]" />
        </h3>

        {favoriteItem.length === 0 ? (
          <div className="flex flex-col md:flex-row items-center justify-center py-20 bg-white gap-3 rounded-lg">
            <img className="w-60 md:w-80" src="/images/no-fav.png" alt="no-favorite" />
            <p className="text-lg md:text-xl">No Favorites Products yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-5">
            {favoriteItem.map((item, i) => (
              <Product item={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
