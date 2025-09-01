import User from "../models/userModel.js";

export const saveUser = async (req, res) => {
  try {
    const { name, profile, email } = req.body;
    if (!name || !profile || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User({ name, profile, email });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully", user: newUser });
  }
    catch (error) {
    res.status(500).json({ message: "Error saving user", error: error.message });
  }
};
