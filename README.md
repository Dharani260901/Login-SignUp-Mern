# MERN Authentication Project

A simple **Login and Registration System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This project demonstrates how to register new users, securely log them in, and manage authentication using JWT.

---

## 🚀 Features
- User registration with **Name, Email, and Password**
- Passwords hashed using **bcrypt**
- User login with **JWT-based authentication**
- Welcome message showing the **logged-in username**
- Authentication persistence using **localStorage**
- Basic form validation
- Error handling with appropriate messages

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, React Router, Tailwind CSS 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas / Local)
- **Authentication:** JWT (JSON Web Token), bcrypt

---

## 📂 Project Structure

project/
│── backend/ # Express + MongoDB server
│ ├── models/ # User model
│ ├── routes/ # API routes (auth routes)
│ ├── server.js # Main server file
│
│── frontend/ # React app
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Login, Register, Home
│ │ ├── App.js
│ │ ├── index.js
│
│── README.md


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-auth-project.git
cd mern-auth-project
cd backend
npm install
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
npm start
cd frontend
npm install
npm run dev
```
---

## API Endpoints

### Register User
- POST - /signup
- Body: { "name": "Dharani", "email": "test@email.com", "password": "123456" }

### Login User
- POST - /login
- Body: { "email": "test@email.com", "password": "123456" }

