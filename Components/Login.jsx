"use client";
import React, { useState } from "react";
import Signin from "./Signin";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  if (showSignIn) {
    return <Signin onBack={() => setShowSignIn(false)} />;
  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter the credentials");
      return;
    }
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        toast.success(response.data?.message || "Login Successful"); 
        console.log(response?.data?.user)       
        router.push("/dashboard");
        return;
      }
      
      toast.error(response.data?.error || "Login failed");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error in Login");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <p className="title">LogIn</p>

        <form className="form" onSubmit={handleSignIn}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="input-username"
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="input-password"
              autoComplete="current-password"
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>

          <button type="submit" className="sign">Sign in</button>
        </form>

        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>

        <div className="social-icons">
          <button type="button" aria-label="Log in with Google" className="icon">...</button>
          <button type="button" aria-label="Log in with Twitter" className="icon">...</button>
          <button type="button" aria-label="Log in with GitHub" className="icon">...</button>
        </div>

        <p className="signup">
          Don't have an account?
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowSignIn(true);
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
