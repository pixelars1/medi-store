import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// ✅ Add item to cart
router.post("/", addToCart);

// ✅ Get cart by userId
router.get("/user/:userId", getCart);

// ✅ Update item quantity
router.patch("/:cartId/items/:productId", updateCartItem);

// ✅ Remove item from cart
router.delete("/:cartId/items/:productId", removeCartItem);

// ✅ Clear entire cart
router.delete("/:cartId", clearCart);

export default router;
