import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
// import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
// ✅ Middlewares
app.use(cors({
    origin: "http://localhost:5173" || "https://medi-store-ebon.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"]
 }))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// ✅ Routes
// app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
export { app };