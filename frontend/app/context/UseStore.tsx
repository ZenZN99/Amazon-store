"use client";
import { useContext } from "react";
import  { Context } from "./Context";



export const useStore  = () => { 
  const context = useContext(Context);
  if (!context) {
    throw new Error("use must be used within a CartProvider");
  }
  return context;
}