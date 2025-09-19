import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ipAddress: String,                     // Optional: track IP
  userId: { type:String, default: null }, // if logged in
  userAgent: String, 
  visits: [
    {
      date: { type: String },     // e.g. "2025-09-19"
      count: { type: Number, default: 1 }
    }
  ],                     // browser/device info
  pagesViewed: [{ type: String }],        // URLs visited
  productsViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  searches: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Visitor", visitorSchema);
