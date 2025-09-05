import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Firebase UID or User._id

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // snapshot of product price
      },
    ],

    totalPrice: { type: Number, default: 0 }, // ✅ auto-calculated total
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Middleware to auto-calculate totalPrice before saving
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Cart", cartSchema);
