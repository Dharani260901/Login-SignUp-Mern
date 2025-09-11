import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();

  // ✅ Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // remove token
    toast.success("Logged out successfully! 👋");
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl text-red-400 font-bold">Welcome to Home Page!</h1>

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
