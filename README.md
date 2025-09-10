MERN Login & Signup Project
Overview
This is a Login and Signup application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT authentication and bcrypt password hashing.
The project demonstrates secure user authentication, registration, and login flows with token-based authorization.

Features
User Registration: Users can create an account with email and password.
Password Security: Passwords are securely hashed using bcrypt.
User Login: Registered users can log in using email and password.
JWT Authentication: Authenticated users receive a JWT token to access protected routes.
Frontend Validation: Basic input validation for registration and login forms.
Protected Routes: Only authenticated users can access specific pages.
Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
Authentication	JWT (JSON Web Tokens), bcrypt
Installation
Navigate to the backend folder
cd backend

Install dependencies npm install

Create a .env file with your MongoDB URI and JWT secret
Example:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Start the backend server
npm run dev

Navigate to the frontend folder
cd frontend

Install dependencies
npm install

Start the frontend server
npm start
