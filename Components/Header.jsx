"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Logout from "./Logout";
const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const res = await axios.get("/api/auth/me");
      if (res.data.authenticated) {
        setUser(res.data.user);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-extrabold text-cyan-800">Blogify</p>
        <p className="p-2 border-red-700 rounded-xl w-fit font-bold text-red-500 shadow shadow-cyan-300 bg-cyan-800 animate-bounce transition-transform">
          Welcome-{" "}
          <span className="text-blue-400 animate-pulse">{user?.email}</span>
        </p>
        <Logout />
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Step into the world where creativity meets simplicity. Our blog app is
          designed for creators who want to express without limits—fast
          publishing, clean design, and a seamless writing experience.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border shadow-xl "
          action=""
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none placeholder:text-red-500 text-red-500"
            required
          />
          <button
            type="submit"
            className="py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white bg-cyan-300 text-white hover:scale-110"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
