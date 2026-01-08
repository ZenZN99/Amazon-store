"use client";
import { useEffect, useState } from "react";
import SlideProduct from "./components/SlideProduct";
import Hero from "./components/Hero";
interface ProductData {
  id: number;
  title: string;
  images: string[];
  price: number;
}

const Home = () => {
  const categories = [
    "laptops",
    "beauty",
    "fragrances",
    "furniture",
    "home-decoration",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "smartphones",
    "sunglasses",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
  ];
  const [product, setProduct] = useState<Record<string, ProductData[]>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchingAPI = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );
        const productData = Object.assign({}, ...results);
        setProduct(productData);
      } catch (e) {
        console.log("Error fetcing API", e);
      } finally {
        setLoading(false);
      }
    };
    fetchingAPI();
  }, []);

  

  return (
    <div>
      <Hero />
      {loading ? (
        <div></div>
      ) : (
        categories.map((category) => (
          <div key={category}>
            <SlideProduct
              data={product[category]}
              title={category.replace("-", " ")}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
