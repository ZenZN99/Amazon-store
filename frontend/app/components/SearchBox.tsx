"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SearchProductData {
  id: number;
  title: string;
  images: string[];
}

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<SearchProductData[]>([]);
  const pathname = usePathname(); 
  const router = useRouter(); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.trim()) {
      return toast.error(<p>Please fill out the field</p>);
    }
    router.push(`/search?query=${encodeURIComponent(searchText.trim())}`);
    setSuggestions([]);
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchText}`
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (e) {
        console.log(e);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchText]);

  useEffect(() => {
    setSearchText("");
    setSuggestions([]);
  }, [pathname]);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="w-125 h-12.5 flex items-center border border-gray-700 bg-white rounded-md"
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          className="w-110 bg-white px-3 outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="w-15 bg-orange-400 h-12 flex items-center justify-center text-[23px]"
        >
          <IoSearchSharp />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="search-product absolute w-full bg-white z-1000">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="border-b border-gray-500 border-opacity-25 flex items-center justify-between px-8 font-semibold"
            >
              <Link href={`/product/${item.id}`} className="flex items-center gap-4 w-full">
                <img className="w-20" src={item.images[0]} alt={item.title} />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
