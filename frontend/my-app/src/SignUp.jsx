// ✅ 1. Import toast and ToastContainer
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // <-- Added
import 'react-toastify/dist/ReactToastify.css';          // <-- Added

const SignUp = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    
const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(`${API_URL}/signup`,{name,email,password})
        .then(response=>{
            toast.success("User registered successfully! 🎉"); // ✅ Added toast
            setTimeout(() => navigate('/login'), 1500);       // ✅ Navigate after toast
            console.log("User registered successfully:",response.data);
        })
        .catch(error=>{
            toast.error("Error registering user ❌");         // ✅ Added toast
            console.error("There was an error registering the user!",error);
        })
    }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-blue-100 shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex items-center gap-8">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-9">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete='new-password'
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login"><button className="text-indigo-600 font-medium hover:underline">
            Login
          </button></Link>
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

export default SignUp
