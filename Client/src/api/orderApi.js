// api/orderApi.js
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/orders`, 
  withCredentials: true,
});

// ✅ Get all orders for logged-in user
export const getOrders = () => API.get("/");

// ✅ Get single order details
export const getOrderById = (id) => API.get(`/${id}`);

// ✅ Create new order
export const createOrder = (orderData) => API.post("/", orderData);

// ✅ Update order (e.g. status update, only for admin)
export const updateOrder = (id, updateData) =>
  API.put(`/${id}`, updateData);

// ✅ Delete order (optional, usually admin only)
export const deleteOrder = (id) => API.delete(`/${id}`);
