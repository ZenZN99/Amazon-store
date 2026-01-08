"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FcSearch } from "react-icons/fc";
import Product from "../components/Product";

interface ProductData {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const SearchResults = () => {
  const [results, setResults] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (e) {
        console.log(e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      setLoading(true);
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div>
      <div className="container">
        {loading ? (
          <p className="text-center py-10 text-[20px]">Loading...</p>
        ) : results.length > 0 ? (
          <div>
            <h3 className="py-3 text-[35px] font-semibold">
              Results For: <span className="font-bold">{query}</span>
            </h3>

            <div className="flex items-center justify-center flex-wrap gap-4">
              {results.map((item) => (
                <div key={item.id}>
                  <Product item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-125">
            <p className="flex items-center gap-2 text-[30px]">
              No Results Found <FcSearch />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
