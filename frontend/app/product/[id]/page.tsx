"use client";
import { useEffect, useState } from "react";
import {
  FaCartArrowDown,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/app/context/UseStore";
interface ProductData {
  id: number;
  title: string;
  images: string[];
  description: string;
  price: number;
  availabilityStatus: string;
  brand: string;
  quantity: number;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<null | ProductData>(null);
  const [loading, setLoading] = useState(true);
  const [bigImg, setBigImg] = useState<string>("");
  const { id } = useParams();
  const router = useRouter();
  const {
    addToCart,
    cartItem,
    addToFavorite,
    favoriteItem,
    removeFavoriteItem,
  } = useStore();
  useEffect(() => {
    const fetchAPIById = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setBigImg(data.images[0]);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAPIById();
  }, [id]);

  const isInCart = product ? cartItem.some((i) => i.id === product.id) : false;
  const isInFav = product
    ? favoriteItem.some((i) => i.id === product.id)
    : false;

  const handleCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      images: product.images,
      description: product.description,
      price: product.price,
      availabilityStatus: product.availabilityStatus,
      brand: product.brand,
      quantity: 1,
    });
    toast.success(
      <div>
        <img className="w-50 border-b" src="/images/logo2.png" alt="logo-amazon" />
        <div className="flex items-center justify-between">
          <img className="w-37.5" src={product?.images[0]} alt="img" />
          <h3 className="title font-semibold text-[18px]">{product?.title}</h3>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <p>Added to cart</p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-[yellow] py-2 px-4 rounded-[25px]"
          >
            View Cart
          </button>
        </div>
      </div>,
      { duration: 3000 }
    );
  };
  const handleFavorite = () => {
    if (!product) return;
    if (isInFav) {
      removeFavoriteItem(product?.id); 
      toast.error(`${product?.title} Removed from Favorites`);
    } else {
      addToFavorite({
        id: product?.id,
        title: product?.title,
        price: product?.price,
        images: product?.images
      });
      toast.success(`${product?.title} Added to favorites`);
    }
  };

  if (loading) return null;
  if (!product)
    return (
      <p className="flex items-center justify-center text-[30px] w-full h-screen">
        No Product Found!
      </p>
    );
  console.log(product);

  return (
    <div>
      <div className="container">
        <main className="details flex items-center justify-between">
          <div className="content-details">
            <h3 className="text-[35px] font-semibold">{product.title}</h3>
            <div className="text-yellow-400 flex items-center gap-2 py-3">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <p className="desc text-[20px] my-2 w-150">
              {product.description}
            </p>
            <p className="font-bold text-[20px]">${product.price}</p>
            <h4 className="text-[25px] p-1">
              Brand: <span className="font-semibold">{product.brand}</span>
            </h4>
            <h4 className="text-[25px]">
              Availability:{" "}
              <span className="font-semibold">
                {product.availabilityStatus}
              </span>
            </h4>
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={handleCart}
                className={`flex items-center bg-[yellow] py-3 px-5 rounded-[30px] ${
                  isInCart ? "bg-[lime] pointer-events-none" : ""
                }`}
              >
                {`${isInCart ? "item in cart" : "Add to Cart"}`}
                <FaCartArrowDown />
              </button>
              <span
                onClick={handleFavorite}
                className={`border border-gray-700 w-11.25 h-11.25 cursor-pointer rounded-full flex items-center justify-center hover:bg-[yellow] ${
                  isInFav ? "bg-[yellow]" : ""
                }`}
              >
                <FaHeart />
              </span>
            </div>
          </div>
          <img
            id="big-img"
            className="w-125 h-125"
            src={bigImg}
            alt="img"
          />
          <div className="small-img">
            {product.images.map((img, i) => (
              <div key={i} className="py-4">
                <img
                  className="w-42.5"
                  src={img}
                  alt="img"
                  onClick={() => setBigImg(img)}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetails;
