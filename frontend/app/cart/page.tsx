"use client";

import { FaStar, FaStarHalfAlt, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useStore } from "../context/UseStore";

interface DataType {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
}

const Cart = () => {
  const { cartItem, increaseQuantity, decreseqQuantity, removeItem } =
    useStore();
  const router = useRouter();

  const total = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart px-4 sm:px-20 py-6 flex flex-col lg:flex-row gap-10">
      <div className="flex-1">
        {cartItem.length === 0 ? (
          <div className="cart-no bg-white rounded-md flex flex-col lg:flex-row items-center justify-between p-4 gap-4">
            <img
              className="w-full lg:w-100"
              src="/images/no-cart-pro.svg"
              alt="No product"
            />
            <div className="text-center lg:text-left">
              <p className="text-[20px] pb-2">
                There are no products in the shopping cart.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-yellow-400 py-3 px-6 rounded-[20px]"
              >
                Get Products
              </button>
            </div>
          </div>
        ) : (
          cartItem.map((item: DataType) => (
            <main
              key={item.id}
              className="cart-products flex flex-col sm:flex-row items-center w-full rounded-md bg-white my-4"
            >
              <img
                className="w-full sm:w-75"
                src={item.images[0]}
                alt={item.title}
              />
              <div className="flex-1 p-4">
                <p className="desc text-[20px]">{item.description}</p>
                <div className="text-yellow-400 flex items-center gap-2 py-3">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <p className="price font-bold text-[18px]">${item.price}</p>
                <div className="border-2 border-yellow-400 w-fit flex items-center gap-3 rounded-[20px] py-2 px-4 mt-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => decreseqQuantity(item.id)}
                    className="text-[18px]"
                  >
                    -
                  </button>
                  <span className="text-[18px]">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="text-[18px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </main>
          ))
        )}
      </div>

      <div className="cart-buying bg-white rounded-md w-full lg:w-[30%] flex flex-col items-center justify-center p-6 gap-6">
        <img
          className="w-75 p-4"
          src="/images/logo2.png"
          alt="logo-amazon"
        />
        <p className="text-[20px]">
          Total: <span className="font-semibold">${total.toFixed(2)}</span>
        </p>
        {cartItem.length > 0 && (
          <button
            onClick={() => router.push("/buying")}
            className="bg-yellow-400 py-3 px-12 rounded-[30px]"
          >
            Buy now
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
