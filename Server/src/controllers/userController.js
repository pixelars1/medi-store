import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// 🔹 Register user (after Firebase signup/login)
export const registerUser = async (req, res) => {
  try {
    console.log("req.body",req.body);
    
    const { firebaseUid, name, email, profile } = req.body;

    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Update existing user
      user.name = name || user.name;
      user.email = email || user.email;
      user.profile = profile || user.profile;
      await user.save();
      return res.json({ message: "User updated", user });
    }

    // Create new user
    user = new User({ uid:firebaseUid, name, email, profile });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// 🔹 Get single user (with cart & orders populated)
export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid })
      .populate("cart.productId")
      .populate("orders");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// 🔹 Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// 🔹 Update user profile
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updateData = req.body;

    const user = await User.findOneAndUpdate({ uid }, updateData, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// 🔹 Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { uid } = req.params;
    const { productId, quantity } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if product already in cart
    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// 🔹 Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { uid, productId } = req.params;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};

// 🔹 Place order
export const placeOrder = async (req, res) => {
  try {
    const { uid } = req.params;
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const order = new Order({
      userId: user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    // Push order to user orders
    user.orders.push(order._id);
    // Clear cart after placing order
    user.cart = [];
    await user.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// 🔹 Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid }).populate({
      path: "orders",
      populate: {
        path: "items.productId",
        model: "Product",
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};
