"use client";
import Product from "@/app/components/Product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductItem {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const CategoryPage = () => {
  const params = useParams();
  const category = params.category;
  const [categoryData, setCategoryData] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchForCategory = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        setCategoryData(data.products);
      } catch (e) {
        console.log("error", e);
      }
    };
    fetchForCategory();
  }, [category]);

  return (
    <div className="py-10 px-4">
      <div className="flex items-center flex-wrap justify-center gap-6">
        {categoryData.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
