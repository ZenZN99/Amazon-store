"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ImUserPlus } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { me } from "../api/user.api"; 

interface IUser {
  fullname: string;
  email: string;
  role: string;
  avatar: string;
}

const BtmHeader = () => {
  const navLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Services", link: "/services" },
    { title: "Blog", link: "/blog" },
    { title: "Users", link: "/users" },
  ];

  const categories = [
    "beauty", "fragrances", "furniture", "groceries",
    "home-decoration", "kitchen-accessories", "laptops",
    "mens-shirts", "mens-shoes", "mens-watches",
    "mobile-accessories", "skin-care", "smartphones",
    "sports-accessories", "sunglasses", "tablets", "tops",
    "womens-bags", "womens-dresses", "womens-jewellery",
    "womens-shoes", "womens-watches",
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const data = await me(token);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; 
  };

  return (
    <header className="bg-gray-600 h-13 text-white px-4 xl:px-20 py-3 flex justify-between items-center relative">
      {/* Categories Dropdown */}
      <div className="relative">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 cursor-pointer font-semibold"
        >
          <AiOutlineMenu size={20} />
          <span>Browse Category</span>
          <IoMdArrowDropdown size={18} />
        </div>

        {isMenuOpen && (
          <div className="absolute top-10 left-0 z-50 w-60 max-h-64 overflow-y-auto bg-white text-black shadow-lg rounded-md p-2">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={`/category/${category}`}
                className="block py-2 px-3 rounded hover:bg-orange-500 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((nav, i) => {
          const isActive = pathname === nav.link;
          return (
            <Link
              key={i}
              href={nav.link}
              className={`transition-colors duration-200 ${
                isActive ? "bg-gray-500 py-1 px-3 rounded" : "hover:text-yellow-300"
              }`}
            >
              {nav.title}
            </Link>
          );
        })}
      </nav>

      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <>
            <Link href="/profile" className="flex items-center gap-2">
              <span>{user.fullname}</span>
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-white object-cover hover:border-yellow-400 transition-colors"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
            >
              <MdLogout /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors duration-200"
            >
              <MdLogin /> Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors duration-200"
            >
              <ImUserPlus /> Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-700 text-white flex flex-col lg:hidden shadow-lg z-50">
          <div className="flex flex-col gap-2 p-4 border-b border-gray-500">
            {navLinks.map((nav, i) => {
              const isActive = pathname === nav.link;
              return (
                <Link
                  key={i}
                  href={nav.link}
                  className={`py-2 px-3 rounded transition-colors ${
                    isActive ? "bg-gray-500" : "hover:bg-gray-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {nav.title}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 p-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 py-2 px-3 rounded hover:bg-red-600 bg-red-500 transition-colors"
                >
                  <MdLogout /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MdLogin /> Login
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ImUserPlus /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default BtmHeader;
