import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },              // Medicine name
    category: { type: String, required: true },          // e.g. Pain Relief, Antibiotics
    company: { type: String },                           // Manufacturer

    image: { type: String, required: true },             // Cloudinary URL or local path

    price: { type: Number, required: true },             // Selling price
    originalPrice: { type: Number },                     // MRP if discounted

    description: { type: String },                       // Details
    stock: { type: Number, default: 0 },                 // Available quantity

    prescriptionRequired: { type: Boolean, default: false },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
