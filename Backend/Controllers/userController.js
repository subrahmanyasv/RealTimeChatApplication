import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Login Logic
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Return success if credentials match
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Signup Logic
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create new user
    const newUser = new User({ username, email, password });
    newUser.password = await bcrypt.hash(password, 10); // Hash password
    await newUser.save();

    // Return success
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get User Logic (To be implemented later)
export const getUser = (req, res) => {
  // Placeholder for future implementation
  res.status(200).json({ message: "Get User endpoint" });
};
