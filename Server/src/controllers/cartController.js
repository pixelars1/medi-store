import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity ,tablet} = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const priceRange = product.price.match(/\d+(\.\d+)?/g); // ["389.00", "509.00"]
    let price = 0;
    if (tablet == 90) price = parseFloat(priceRange[0]);   // 389
    else if (tablet == 180) price = parseFloat(priceRange[1]); // 509
    else return res.status(400).json({ message: "Invalid quantity" });
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price:price,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// Get cart by userId
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;

    await cart.save();
    res.json({ message: "Cart item updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error: error.message });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};
