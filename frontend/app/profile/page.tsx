"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { me, updateProfile } from "../api/user.api";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    fullname: string;
    email: string;
    avatar: string;
    role: string;
  } | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
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
  }, [token]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!token || !avatarFile) return;
    setLoading(true);
    try {
      const data = await updateProfile(token, avatarFile);
      setUser(data.user);
      setSuccess(data.success);
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="flex items-center justify-center w-full h-screen text-[20px]">Loading...</p>;

  return (
<div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
  <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Profile</h1>

  <div className="flex flex-col items-center mb-6">
    <div className="w-28 h-28 mb-3 relative">
      <img
        src={user.avatar}
        alt="Avatar"
        className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-inner"
      />
      <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center cursor-pointer shadow-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        ✎
      </label>
    </div>

    <button
      onClick={handleUpdate}
      disabled={loading || !avatarFile}
      className="mt-2 px-6 py-2  bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
    >
      {loading ? "Updating..." : "Update Avatar"}
    </button>
  </div>

  <div className="space-y-3 text-gray-700">
    <p className="flex justify-between">
      <span className="font-semibold">Fullname:</span> <span>{user.fullname || "User name"}</span>
    </p>
    <p className="flex justify-between">
      <span className="font-semibold">Email:</span> <span>{user.email || "user@example.com"}</span>
    </p>
    <p className="flex justify-between">
      <span className="font-semibold">Role:</span> <span>{user.role || "User_"}</span>
    </p>
  </div>

  {success && <p className="mt-4 text-green-500 font-medium text-center">{success}</p>}
</div>

  );
}
