import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
    const [username, setUsername] = useState("");

  // ✅ Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
     const storedName = localStorage.getItem("username");
      if (!token) {
      navigate('/login');
    } else {
      setUsername(storedName); // 👈 get username
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username"); // clear username
    toast.success("Logged out successfully! 👋");
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl text-red-400 font-bold">
        Welcome, {username || "User"}!
      </h1>

      <button 
        onClick={handleLogout} 
        className="text-blue-500 underline mt-4"
      >
        Logout
      </button>

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

export default Home;
