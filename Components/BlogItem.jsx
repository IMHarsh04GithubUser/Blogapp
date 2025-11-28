"use client";
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../app/ThemeContext";
import "@/Styles/header.css";

const BlogItem = ({ title, description, category, image, id }) => {
  const { dark, handlebgdark, handlebglight } = useContext(ThemeContext);

  return (
    <div
      className={
        dark
          ? "max-w-[330px] sm:max-w-[300px] bg-gray-950 border border-gray-800 transition-all shadow rounded-xl hover:shadow-yellow-600 hover:shadow-2xl hover:scale-110 cards-animate"
          : "max-w-[330px] sm:max-w-[300px] bg-white border border-cyan-200 transition-all shadow shadow-yellow-100 rounded-xl hover:shadow-yellow-600 hover:shadow-2xl hover:scale-110 cards-animate"
      }
    >
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          className="border-b rounded-xl hover:scale-110"
        />
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block text-green-600 text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5
          className={
            dark
              ? "mb-2 text-lg font-medium tracking-tight text-gray-500"
              : "mb-2 text-lg font-medium tracking-tight text-gray-900"
          }
        >
          {title}
        </h5>
        <p
          className={
            dark
              ? "mb-3 text-sm tracking-tight text-gray-400"
              : "mb-3 text-sm tracking-tight text-gray-700"
          }
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <Link
          href={`/blogs/${id}`}
          className={
            dark
              ? "inline-flex items-center py-2 font-semibold text-center text-yellow-400 hover:text-red-600"
              : "inline-flex items-center py-2 font-semibold text-center hover:text-red-600"
          }
        >
          Read more{" "}
          <Image src={assets.arrow} className="ml-2" alt="" width={12} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
