"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import "@/Styles/header.css";
import React, { useEffect, useState } from "react";
import Logout from "../../../Components/Logout";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

const Page = ({ params }) => {
  const { dark, handlebgdark, handlebglight } = useContext(ThemeContext);
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <body className={dark ? "bg-black" : ""}></body>
      <div
        className={
          dark
            ? "bg-black py-5 px-5 md:px-12 lg:px-28"
            : "bg-gray-200 py-5 px-5 md:px-12 lg:px-28"
        }
      >
        <div className="flex justify-between items-center">
          <p className="text-3xl font-extrabold text-cyan-800 animate-pulse">
            Blogify
          </p>
          <div className="flex items-center gap-3">
            {dark ? (
              <CiLight className="text-white h-10 w-10" onClick={handlebglight} />
            ) : (
              <MdOutlineDarkMode onClick={handlebgdark} className="h-10 w-10" />
            )}
            <Logout />
          </div>
        </div>
        <div className="text-center my-24">
          <h1
            className={
              dark
                ? "text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-cyan-500 shadow-text-blog"
                : "text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto shadow-text-blog1"
            }
          >
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt=""
          />
          <p
            className={
              dark
                ? "mt-1 pb-2 text-lg max-w-[740px] mx-auto text-white"
                : "mt-1 pb-2 text-lg max-w-[740px] mx-auto"
            }
          >
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white hover:scale-110 transition-transform ease-in-out"
          src={data.image}
          width={800}
          height={480}
          alt=""
        />

        <div
          className={
            dark
              ? "blog-content text-white hover:scale-110 transition-transform ease-in-out"
              : "blog-content hover:scale-110 transition-transform ease-in-out"
          }
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        <div className="my-24">
          <p
            className={
              dark
                ? "text-white font font-semibold my-4"
                : "text-black font font-semibold my-4"
            }
          >
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
