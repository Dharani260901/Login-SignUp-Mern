import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// ✅ 1. Import toast and ToastContainer
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Added

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8080/home')
      .then(result => {
        if(result.data !== "Success"){
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // ✅ 2. Logout function with toast
  const handleLogout = () => {
    // Optional: You can call your backend logout API to clear cookie
    toast.success("Logged out successfully! 👋"); // ✅ Show toast on logout
    setTimeout(() => navigate('/login'), 1000); // ✅ Navigate after toast
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className='text-3xl mt-auto text-red-400 font-bold'>Welcome to Home Page!</h1>
      
      {/* ✅ Logout button calls handleLogout */}
      <button 
        onClick={handleLogout} 
        className="text-blue-500 underline mt-4"
      >
        Logout
      </button>

      {/* ✅ 3. Toast Container */}
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
  )
}

export default Home;
