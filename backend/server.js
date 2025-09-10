import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Employee from './models/Employee.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: ["https://login-sign-up-mern.vercel.app"],
  methods: ["GET","POST"],
  credentials:true

}));
app.use(express.json());
app.use(cookieParser())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Error connecting to MongoDB:', err));


const verifyUser = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.json('The token was not available');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json("Token is wrong");
    req.user = decoded; // 👈 attach user info
    next();
  });
};


app.get('/',(req,res)=>{
  res.json("Backend is running!")
})

app.get('/home',verifyUser, (req,res)=>{
  return res.json("Success")

})

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Employee.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({ name, email, password: hashedPassword });
        await newEmployee.save();

        res.status(201).json({ message: 'Signup successful', user: newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

     // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,              // secret key from .env
      { expiresIn: "1h" }                  // token expiry (1 hour)
    );

      // 👉 Store JWT inside a cookie
    res.cookie("authToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});


    // Send response with token
    res.status(200).json({
      message: "Login successful",
      token,         // 👈 frontend will use this for auth
      user: { id: user._id, name: user.name, email: user.email } // safe user info
    });

  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
