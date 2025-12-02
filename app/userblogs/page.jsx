'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { assets } from '@/Assets/assets';
import Logout from "../../Components/Logout";


const Page = () => {
    const router = useRouter()
  const [image, setImage] = useState(null); // null instead of false
  const [previewUrl, setPreviewUrl] = useState(null);
  

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Harsh Mathur",
    authorImg: "/author_img.png",
  });

  useEffect(() => {
    
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    
    setData(prev => ({ ...prev, [name]: value }));
    
    console.log(name, value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      if (image) formData.append("image", image);

      const response = await axios.post("/api/blog", formData, {
        headers: {

        },
      });

      if (response?.data?.success) {
        alert(response.data.msg || "Blog added successfully");
        
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Harsh Mathur",
          authorImg: "/author_img.png",
        });
      } else {
        alert(response?.data?.msg || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading blog. Check the console for details.");
    }
  };

  return (
    <div>
       <div className="absolute top-4 right-10 flex gap-2">
        <button onClick={()=>router.push('/dashboard')}>BACK</button>
        <Logout />
       </div>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>

        <label htmlFor="image" className="inline-block mt-4 cursor-pointer">
          <div>
            <Image
              className="mt-4"
              src={previewUrl ? previewUrl : assets.upload_area}
              width={140}
              height={70}
              alt="upload preview"
            />
          </div>
        </label>

        <input
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          type="file"
          id="image"
          hidden
          required
          accept="image/*"
        />

        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="write content here"
          rows={6}
          required
        />

        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Page;
