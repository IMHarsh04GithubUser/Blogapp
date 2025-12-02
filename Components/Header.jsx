"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Logout from "./Logout";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "@/app/ThemeContext";
import "@/Styles/header.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const { dark, handlebgdark, handlebglight } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (dark) {
        document.body.classList.add("bg-black");
      } else {
        document.body.classList.remove("bg-black");
      }
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("bg-black");
      }
    };
  }, [dark]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post("/api/email", formData);

      if (response?.data?.success) {
        toast.success(response.data.msg || "Subscribed successfully");
        setEmail("");
      } else {
        toast.error(response?.data?.msg || "Subscription error");
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      toast.error("Error subscribing. Check console.");
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function loadUser() {
      try {
        const res = await axios.get("/api/auth/me");
        if (!cancelled && res?.data?.authenticated) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    }
    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-extrabold text-cyan-800">Blogify</p>

        <p className="md:block md:p-2 md:border md:border-red-700 md:rounded-xl md:w-fit md:font-bold md:text-red-500 md:shadow md:shadow-cyan-300 catchy-text-header hidden">
          <span className="text-xl">Welcome- </span>
          <span className="text-blue-400 text-sm">{user?.email}</span>
        </p>

        <div className="flex items-center gap-4">
          <button
            className={
              dark
                ? "py-2 px-4 text-white border border-cyan-700 rounded hover:bg-blue-500 hover:translate-x-2 hover:text-white transition-all ease-in-out"
                : "py-2 px-4 border rounded hover:bg-blue-500 hover:translate-x-2 hover:text-white transition-all ease-in-out"
            }
            onClick={() => router.push("/userblogs")}
          >
            ADD BLOG
          </button>

          {dark ? (
            <CiLight
              className="h-10 w-10 text-white cursor-pointer"
              onClick={handlebglight}
            />
          ) : (
            <MdOutlineDarkMode
              className="h-10 w-10 cursor-pointer"
              onClick={handlebgdark}
            />
          )}

          <Logout />
        </div>
      </div>

      <div className="text-center my-8">
        <p className="p-2 border border-red-700 rounded-xl w-fit font-bold text-red-500 shadow shadow-cyan-300 top-25 mx-14 md:hidden">
          <span className="text-xl">Welcome- </span>
          <span className="text-blue-400 text-sm">{user?.email}</span>
        </p>

        <h1 className="text-3xl sm:text-5xl font-medium italic text-red-400 mt-6">
          Latest-Blogs
        </h1>

        <p
          className={
            dark
              ? "text-gray-500 mt-10 max-w-[740px] m-auto text-xs sm:text-base"
              : "mt-10 max-w-[740px] m-auto text-xs sm:text-base"
          }
        >
          Step into the world where creativity meets simplicity. Our blog app is
          designed for creators who want to express without limits—fast
          publishing, clean design, and a seamless writing experience.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className={`flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border shadow-xl ${
            dark ? "shadow-cyan-600" : ""
          }`}
          aria-label="Subscribe form"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className={
              dark
                ? "pl-4 outline-none placeholder:text-red-500 text-red-500 w-full placeholder:px-5"
                : "outline-none px-5 w-full"
            }
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
    </header>
  );
};

export default Header;
