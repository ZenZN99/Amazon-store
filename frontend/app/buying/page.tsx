"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "../context/UseStore";

interface InputTyping {
  nameCard: string;
  numberCard: number | string;
  date: number | string;
  Securitycode: number | string;
  address: string;
  street: string;
  location: string;
}

const Buying = () => {
  const { cartItem, setCartItem } = useStore();
  const [text, setText] = useState<InputTyping>({
    nameCard: "",
    numberCard: "",
    date: "",
    Securitycode: "",
    address: "",
    street: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !text.nameCard ||
      !text.numberCard ||
      !text.date ||
      !text.Securitycode ||
      !text.address ||
      !text.street ||
      !text.location
    ) {
      return toast.error("Please fill out the fields");
    }

    // Reset form
    setText({
      nameCard: "",
      numberCard: "",
      date: "",
      Securitycode: "",
      address: "",
      street: "",
      location: "",
    });

    // Play sound
    const audio = new Audio("/audio/audio.mp3");
    audio.play();

    toast.success("Purchase completed successfully");
    setCartItem([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setText((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="my-6">
      <div className="buying flex items-center flex-col justify-center bg-white w-full max-w-150 mx-auto py-12 rounded-lg shadow-lg">
        <img
          className="w-50 mb-4"
          src="/images/logo2.png"
          alt="logo-amazon"
        />

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4"
        >
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="text"
            placeholder="Name of the card"
            id="nameCard"
            value={text.nameCard}
            onChange={handleChange}
          />
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="number"
            placeholder="Number of the card"
            id="numberCard"
            value={text.numberCard}
            onChange={handleChange}
          />
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="text"
            placeholder="MM/YY"
            id="date"
            value={text.date}
            onChange={handleChange}
          />
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="text"
            placeholder="CCV"
            id="Securitycode"
            value={text.Securitycode}
            onChange={handleChange}
          />
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="text"
            placeholder="Region/Address"
            id="address"
            value={text.address}
            onChange={handleChange}
          />
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="text"
            placeholder="Street name"
            id="street"
            value={text.street}
            onChange={handleChange}
          />
          <input
            className="py-3 px-6 rounded-[30px] border border-yellow-400 outline-none"
            type="text"
            placeholder="Receipt location"
            id="location"
            value={text.location}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-yellow-400 py-2 px-4 rounded-[30px] col-span-1 sm:col-span-2"
          >
            Buy now
          </button>
          <p className="text-center col-span-1 sm:col-span-2">
            Shipping will reach you within 3 days
          </p>
        </form>
      </div>
    </div>
  );
};

export default Buying;
