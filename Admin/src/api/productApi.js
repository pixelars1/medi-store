// api/productApi.js
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // change to your deployed backend URL
});
console.log("API Base URL:", import.meta.env.VITE_BACKEND_URL);
// Create product
export const createProduct = async (formData) => {
  try {
    return await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all products
export const getProducts = async () => {
  try {

    const res = await api.get("/products");
    const fetched = Array.isArray(res?.data) ? res.data : [];
    return fetched;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// Update product
export const updateProduct = async (id, formData) => {
  try {
    return await api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    return await api.delete(`/products/${id}`);
  } catch (error) {
    throw error.response?.data || error;
  }
};
