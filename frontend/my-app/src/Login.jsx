import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ 1. Import toast and ToastContainer
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Added

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8080/login';

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL, { email, password })
      .then(response => {
        toast.success("Login successful! 🎉"); // ✅ Added toast
        setTimeout(() => navigate('/home'), 1500); // ✅ Navigate after toast
        console.log("User logged in successfully:", response.data);
      })
      .catch(error => {
        toast.error("Login failed ❌"); // ✅ Added toast
        console.error("There was an error logging in the user!", error);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-blue-100 shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Option */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/">
            <button className="text-indigo-600 font-medium hover:underline">
              Signup
            </button>
          </Link>
        </p>
      </div>

      {/* ✅ 2. Toast Container added here */}
          <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false}   // ✅ Changed from true/hidden to false
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
