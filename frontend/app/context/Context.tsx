"use client";
import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface CartItems {
  id: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  brand: string;
  availabilityStatus: string;
}

export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  images: string[]
}

export interface CartContextType {
  cartItem: CartItems[];
  favoriteItem: FavoriteItem[];
  addToCart: (item: CartItems) => void;
  increaseQuantity: (id: number) => void;
  decreseqQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  addToFavorite: (item: FavoriteItem) => void;
  removeFavoriteItem: (id: number) => void;
  setCartItem: React.Dispatch<React.SetStateAction<CartItems[]>>;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const Context = createContext<CartContextType | undefined>(
  undefined
);

export default function ContextProvider({ children }: ContextProviderProps) {
  // ===== Favorite =====
  const [favoriteItem, setFavoriteItem] = useState<FavoriteItem[]>(() => {
    try {
      const saveFavoriteItems = localStorage.getItem("favoriteItems");
      return saveFavoriteItems ? JSON.parse(saveFavoriteItems) : [];
    } catch {
      return [];
    }
  });


  const addToFavorite = (item: FavoriteItem) => {
    setFavoriteItem((prevItems) => {
      if (prevItems.some((i) => i.id === item.id)) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFavoriteItem = (id: number) => {
    setFavoriteItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItem));
  }, [favoriteItem]);
 

  // ===== Cart =====
  const [cartItem, setCartItem] = useState<CartItems[]>(() => {
    try {
      const saveCartItems = localStorage.getItem("cartItems");
      return saveCartItems ? JSON.parse(saveCartItems) : [];
    } catch {
      return [];
    }
  });


  const addToCart = (item: CartItems) =>
    setCartItem((prevItems) => [...prevItems, { ...item, quantity: 1 }]);

  const increaseQuantity = (id: number) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreseqQuantity = (id: number) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <Context.Provider
      value={{
        cartItem,
        favoriteItem,
        addToCart,
        increaseQuantity,
        decreseqQuantity,
        removeItem,
        addToFavorite,
        removeFavoriteItem,
        setCartItem,
      }}
    >
      {children}
    </Context.Provider>
  );
}
