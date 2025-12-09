'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Signin from "../Components/Signin";
import Login from "../Components/Login";
import './globals.css'


export default function Home() {
  return (
    <>
      <ToastContainer theme="dark"/>
      <Signin />
      
      {/* <Header/>
      <BlogList/>
      <Footer/> */}
    </>
  )
}
