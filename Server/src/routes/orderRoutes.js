import express from "express";
import {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Create new order
router.post("/", placeOrder);

// Get all orders (for logged-in user)
router.get("/", getOrders);

// Get single order details
router.get("/:id", getOrderById);

// Update order (admin only)
router.put("/:id", updateOrder);

// Delete order (optional, usually admin only)
router.delete("/:id", deleteOrder);

export default router;