import axios from "axios";

const API = axios.create({
  baseURL:`${import.meta.env.VITE_BACKEND_URL}/carts`, // ✅ update if deployed
});

// ✅ Add item to cart
export const addToCart = async (cartData) => {
  const { data } = await API.post("/", cartData);
  return data;
};

// ✅ Get cart by userId
export const getCart = async (userId) => {
  const { data } = await API.get(`/user/${userId}`);
  return data;
};

// ✅ Update item quantity in cart
export const updateCartItem = async (cartId, productId, quantity) => {
  const { data } = await API.patch(`/${cartId}/items/${productId}`, { quantity });
  return data;
};

// ✅ Remove item from cart
export const removeCartItem = async (cartId, productId) => {
  const { data } = await API.delete(`/${cartId}/items/${productId}`);
  return data;
};

// ✅ Clear entire cart
export const clearCart = async (cartId) => {
  const { data } = await API.delete(`/${cartId}`);
  return data;
};
