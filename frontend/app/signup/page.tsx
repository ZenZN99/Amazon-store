"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { signup } from "../api/user.api";

const SignUp = () => {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signup(form.fullname, form.email, form.password);

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.success || "Account created successfully!");
        window.location.reload();
        router.push("/");
      }
    } catch (err) {
      toast.error("Server error. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="register flex flex-col items-center justify-center bg-white shadow-lg w-full max-w-2xl mx-4 md:mx-auto py-12 px-8 rounded-2xl">
    
    {/* Logo */}
    <img className="w-40 md:w-48 mb-6" src="/images/logo2.png" alt="logo" />

    {/* Title */}
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Create Your Account
    </h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      
      <input
        className="py-3 px-6 rounded-[30px] border border-[yellow] outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
        type="text"
        placeholder="Fullname"
        name="fullname"
        value={form.fullname}
        onChange={handleChange}
      />
      
      <input
        className="py-3 px-6 rounded-[30px] border border-[yellow] outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      
      <input
        className="py-3 px-6 rounded-[30px] border border-[yellow] outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 col-span-1 md:col-span-2"
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      
      <button
        type="submit"
        className="bg-[yellow] hover:bg-[#e2e200] transition-colors duration-200 text-black font-semibold py-3 px-6 rounded-[30px] col-span-1 md:col-span-2 shadow-md hover:shadow-lg"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      
      <p className="flex items-center justify-center col-span-1 md:col-span-2 text-gray-600 mt-2">
        Already have an account?{" "}
        <Link
          className="text-blue-700 font-semibold underline ml-2 hover:text-blue-800"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</div>


  );
};

export default SignUp;
