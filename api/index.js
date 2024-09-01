import cors from "cors";
import express from "express";

import mongoose from "mongoose";

import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.FRONTENDURL,
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "174.50.139.119", //local IP address
  "http://localhost:5173", // Local development origin
  "https://main.d18slomsbic04x.amplifyapp.com", // Deployed Amplify app origin
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000; // Use the PORT environment variable or fallback to 3000 for local development
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

// app.listen(3000, () => {
//   console.log("server is running on port 3000!");
// });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("Denny, this is your Express server! Is pipeline working?");
});
