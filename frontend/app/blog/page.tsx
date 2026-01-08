"use client";

import Link from "next/link";

const blogs = [
  {
    id: 1,
    img: "/images/blog-img2.webp",
    title: "5 Reasons That Affect Consumer Purchasing Behavior",
    href: "/blog/blog1",
  },
  {
    id: 2,
    img: "/images/blog-img3.webp",
    title: "Things to Consider When Getting Started with E-Commerce",
    href: "/blog/blog2",
  },
  {
    id: 3,
    img: "/images/blog-img4.jpg",
    title: "Things to Consider When Selling Online",
    href: "/blog/blog3",
  },
  {
    id: 4,
    img: "/images/blog-img5.webp",
    title: "Beginner's Guide to E-commerce in Turkiye",
    href: "/blog/blog4",
  },
  {
    id: 5,
    img: "/images/blog-img9.webp",
    title: "How to Establish a Sole Proprietorship? What are the Required Documents",
    href: "/blog/blog5",
  },
  {
    id: 6,
    img: "/images/blog-img7.webp",
    title: "What is 3D Secure Shopping?",
    href: "/blog/blog6",
  },
  {
    id: 7,
    img: "/images/blog-img8.webp",
    title: "What is a Limited Company?",
    href: "/blog/blog7",
  },
  {
    id: 8,
    img: "/images/blog-img6.webp",
    title: "How to Manage a Virtual Store",
    href: "/blog/blog8",
  },
  {
    id: 9,
    img: "/images/blog-img10.png",
    title: "How to Analyze Amazon Customer Satisfaction",
    href: "/blog/blog9",
  },
  {
    id: 10,
    img: "/images/blog-img11.png",
    title: "What is the Import Free to Get a Refund",
    href: "/blog/blog10",
  },
  {
    id: 11,
    img: "/images/blog-img12.webp",
    title: "What is E-Export and How is it Done",
    href: "/blog/blog11",
  },
  {
    id: 12,
    img: "/images/blog-img13.webp",
    title: "What You Need to Know About E-Commerce Law",
    href: "/blog/blog12",
  },
];

const Blog = () => {
  return (
    <div className="py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg flex flex-col items-center border border-blue-800 h-100 hover:shadow-lg transition-shadow"
          >
            <img
              className="p-2 w-[80%] h-50 object-cover rounded-t-lg"
              src={blog.img}
              alt={`blog-img${blog.id}`}
            />
            <Link
              href={blog.href}
              className="text-blue-900 font-bold text-[20px] text-center p-4 hover:underline"
            >
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
