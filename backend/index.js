import express from "express";
import 'dotenv/config'
import cors from "cors";
import { default as mongoose } from "mongoose";
import cookieParser from "cookie-parser";
import path from 'path';
import { authRoutes } from "./router/auth.js"
import { postRoutes } from "./router/post.js"

const __dirname = path.resolve();       
const app = express();
 
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Replace with your client's domain
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"));
 
 
    const mongoDBConnectionUrl = process.env.DATABASE_CONNECTION   
    mongoose.connect(mongoDBConnectionUrl)


//Routes 
app.use("/api", authRoutes);
app.use("/api", postRoutes);  
 
 
app.listen(process.env.PORT,()=>{
    console.log("server is running on PORT: "+process.env.PORT );
});
 