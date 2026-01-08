"use client";

import { useState, useEffect } from "react";
import { getAllUsers, getUserById, deleteUser, me as fetchMe } from "../api/user.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IUser {
  _id: string;
  fullname: string;
  email: string;
  avatar: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const router = useRouter();
  useEffect(() => {
    if(!t){
        toast.error("You must log in first!");
        router.push('/login');
        window.location.reload();
        return;
    }
  },[]);

  useEffect(() => {
    if (!t) return;
    setToken(t);

    const fetchData = async () => {
      try {
        const usersData = await getAllUsers(t);
        setUsers(usersData);

        const currentUserData = await fetchMe(t);
        setCurrentUser(currentUserData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSelectUser = async (id: string) => {
    try {
      const user = await getUserById(id);
      setSelectedUser(user);
      setSuccess("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this user?")) return;

    setDeleteLoading(true);
    try {
      const res = await deleteUser(token, id);
      setSuccess(res.success);
      setUsers(users.filter((u) => u._id !== id));
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200 transition-colors"
              onClick={() => handleSelectUser(user._id)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user.fullname}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {!selectedUser && (
          <p className="text-gray-500 text-center mt-20">Select a user to view profile</p>
        )}

        {selectedUser && (
          <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
              Profile
            </h1>

            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 mb-3 relative">
                <img
                  src={selectedUser.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="flex justify-between">
                <span className="font-semibold">Fullname:</span>{" "}
                <span>{selectedUser.fullname}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Email:</span> <span>{selectedUser.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Role:</span> <span>{selectedUser.role}</span>
              </p>
            </div>

            {currentUser?.role === "Admin" && (
              <button
                onClick={() => handleDelete(selectedUser._id)}
                disabled={deleteLoading}
                className="mt-4 w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 disabled:bg-gray-400 transition-colors duration-200"
              >
                {deleteLoading ? "Deleting..." : "Delete User"}
              </button>
            )}

            {success && (
              <p className="mt-4 text-green-500 font-medium text-center">{success}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
