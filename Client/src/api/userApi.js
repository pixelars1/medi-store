// src/api/userApi.js
import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL,
  // withCredentials: true,
});

// 🔹 Create/Register user after Firebase signup
export const registerUser = async (userData) => {
  console.log("userData",userData);
  console.log("import.meta.env.VITE_BACKEND_API",import.meta.env.VITE_BACKEND_URL);
  
  const { data } = await API.post("/users/register", userData);
  return data;
};

// 🔹 Get user profile (with cart & orders populated)
export const getUserProfile = async (uid) => {
  const { data } = await API.get(`/users/${uid}`);
  return data;
};

// 🔹 Update user profile
export const updateUserProfile = async (uid, updateData) => {
  const { data } = await API.put(`/users/${uid}`, updateData);
  return data;
};

// 🔹 Add item to cart
export const addToCart = async (uid, productId, quantity = 1) => {
  const { data } = await API.post(`/users/${uid}/cart`, { productId, quantity });
  return data;
};

// 🔹 Remove item from cart
export const removeFromCart = async (uid, productId) => {
  const { data } = await API.delete(`/users/${uid}/cart/${productId}`);
  return data;
};

// 🔹 Place order
export const placeOrder = async (uid, orderData) => {
  const { data } = await API.post(`/users/${uid}/orders`, orderData);
  return data;
};

// 🔹 Get user orders
export const getUserOrders = async (uid) => {
  const { data } = await API.get(`/users/${uid}/orders`);
  return data;
};
