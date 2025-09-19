import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { userId, address, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount,
      address,
      paymentMethod,
      status: "pending",
    });

    await newOrder.save();

    // Clear cart after order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    // 🔹 Populate product details before sending response
    const populatedOrder = await Order.findById(newOrder._id).populate("items.productId");

    res.status(201).json({ message: "Order placed successfully", order: populatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// Get all orders for logged-in user
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.query; // from query params
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// Update order (admin only)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const order = await Order.findByIdAndUpdate(id, updateData, { new: true })
      .populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted", order });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};
