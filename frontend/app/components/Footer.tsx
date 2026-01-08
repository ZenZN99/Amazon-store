"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-10">
      <div className="bg-gray-700 w-full h-15 hover:bg-gray-600 cursor-pointer text-white flex items-center justify-center">
        Back to top
      </div>

      <div className="container mx-auto px-4">
        <div className="footer-columns flex items-start justify-between gap-6">
          <div className="footer-height flex flex-col py-10 gap-3 h-125">
            <h3 className="text-white font-bold">About us</h3>
            <a href="#" className="text-[#ccc] hover:underline">
              Career
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Communication
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Information Society Services
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Amazon Science
            </a>
          </div>

          <div className="footer-height flex flex-col py-10 gap-3 h-125">
            <h3 className="text-white font-bold">Make Money With Us</h3>
            <a href="#" className="text-[#ccc] hover:underline">
              Protect and Build Your Brand
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Sell on Amazon
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Advertise Your Products
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Sell Worldwide with Amazon
            </a>
          </div>

          <div className="footer-height flex flex-col py-10 gap-3 h-125">
            <h3 className="text-white font-bold">Amazon Payment Tools</h3>
            <a href="#" className="text-[#ccc] hover:underline">
              Credit card
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Payment in Installments
            </a>
          </div>

          <div className="footer-height flex flex-col py-10 gap-3 h-125">
            <h3 className="text-white font-bold">Let Us Help You</h3>
            <a href="#" className="text-[#ccc] hover:underline">
              COVID-19 and Amazon
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Track Shipments or View Orders
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Delivery Fees and Policies
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Refunds
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Recycle
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Return Calls and Product Safety Warnings
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Amazon Mobile App
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Customer service
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Accessibility
            </a>
            <a href="#" className="text-[#ccc] hover:underline">
              Community Guidelines Comment Posting Criteria
            </a>
          </div>
        </div>

        <hr className="opacity-20 my-5" />

        <div className="footer-logo-region flex items-center justify-center gap-20 py-7 flex-wrap">
          <Link href="/">
            <img className="w-25" src="/images/logo.png" alt="logo" />
          </Link>
          <div className="border border-gray-500 flex items-center gap-4 p-2 cursor-pointer">
            <img
              className="w-7.5 rounded-md"
              src="/images/usa.png"
              alt="usa-icon"
            />
            <p className="text-white">USA</p>
          </div>
        </div>

        <div className="footer-services flex items-center justify-center gap-10 flex-wrap py-5">
          <a href="#" className="text-[#ccc] hover:underline text-[13px]">
            <h4 className="text-white">Amazon Web Services</h4>Scalable Cloud
            Computing Services
          </a>
          <a href="#" className="text-[#ccc] hover:underline text-[13px]">
            <h4 className="text-white">East Dane</h4>Designer Men's Fashion
          </a>
          <a href="#" className="text-[#ccc] hover:underline text-[13px]">
            <h4 className="text-white">Shopbop</h4>Designer Products Fashion
            Brands
          </a>
        </div>

        <div className="footer-links flex items-center justify-center gap-8 flex-wrap text-[#ccc] text-[14px]">
          <a href="#" className="hover:underline">
            Transaction Guide
          </a>
          <a href="#" className="hover:underline">
            Interest-Based Promotions
          </a>
          <a href="#" className="hover:underline">
            About Cookies
          </a>
          <a href="#" className="hover:underline">
            Lighting Notice
          </a>
          <a href="#" className="hover:underline">
            Kullanım ve Satış Koşulları
          </a>
        </div>

        <p className="text-gray-400 text-center py-3 text-[14px]">
          © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
