"use client";
import React, { useState } from "react";
import "./signin.css";
import Login from "./Login";
import { toast } from "react-toastify";


export default function Signin() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password||!name) {
      toast.error("Enter whole credentials");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,email, password }),
      });

      if (response.status === 201) {
        toast.success(
          response.data?.message || "Registered / Logged in Successfully"
        );

        setShowLogin(true);
      } else {
        toast.error(
          response.data?.message || "Unexpected response from server"
        );
      }
    } catch (error) {
      console.error("Signin error:", error);
      toast.error(
        error?.response?.data?.error || "Server error — check console"
      );
    } finally {
      setLoading(false);
    }
  };

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="form-container">
      <p className="title">Register</p>

      <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name1"
            id="name"
            placeholder="Name"
            className="input-username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="input-username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgot">
            <a rel="noopener noreferrer" href="#">
              Forgot Password ?
            </a>
          </div>
        </div>

        <button type="submit" className="sign" disabled={loading}>
          {loading ? "Please wait..." : "Sign in"}
        </button>
      </form>

      <div className="social-message">
        <div className="line" />
        <p className="message">Login with social accounts</p>
        <div className="line" />
      </div>

      <div className="social-icons">
        <button aria-label="Log in with Google" className="icon" />
        <button aria-label="Log in with Twitter" className="icon" />
        <button aria-label="Log in with GitHub" className="icon" />
      </div>

      <p className="signup">
        Already have an account?
        <button
          type="button"
          className="login-link"
          onClick={() => setShowLogin(true)}
          style={{ marginLeft: 8 }}
        >
          Login
        </button>
      </p>
    </div>
  );
}
