import express from "express";
import {
  registerUser,
  getUser,
  getAllUsers,
  updateUser,
  addToCart,
  removeFromCart,
  placeOrder,
  getUserOrders,
} from "../controllers/userController.js";

const router = express.Router();

// 🔹 Register user (after Firebase signup)
router.post("/register", registerUser);

// 🔹 Get single user by Firebase UID (with cart & orders populated)
router.get("/:uid", getUser);

// 🔹 Update user profile
router.put("/:uid", updateUser);

// 🔹 Add item to cart
router.post("/:uid/cart", addToCart);

// 🔹 Remove item from cart
router.delete("/:uid/cart/:productId", removeFromCart);

// 🔹 Place order
router.post("/:uid/orders", placeOrder);

// 🔹 Get user orders
router.get("/:uid/orders", getUserOrders);

// 🔹 Get all users (admin only)
router.get("/", getAllUsers);

export default router;
