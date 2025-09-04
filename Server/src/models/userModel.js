import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    profile: { type: String, default: "" }, // profile picture URL (optional)
    phone: { type: String },                // user phone number
    address: { type: String },              // delivery address

    role: { type: String, enum: ["user", "admin"], default: "user" }, // access control

    // 🔹 Cart items
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],

    // 🔹 Orders (reference to Order collection)
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
