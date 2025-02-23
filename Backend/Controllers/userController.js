import bcrypt from "bcryptjs";
import { User } from "../Models/authenticationModel.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
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
    const token = jwt.sign({ id: user._id,  email: user.email , username: user.username }, JWT_SECRET_KEY);
    return res.status(200).cookie("token", token, {
      httpOnly: true,  // To Avoid using httpOnly cookie and store it in browser.
      // secure: true,    //Enabled in production as it sets for only HTTPS
      sameSite: "None",
      maxAge: 24*60*60*1000     //Cookie expires after 24 hours
  }).json({ email: email , username : user.username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    await newUser.save();

    // Return success
    const token = jwt.sign({ id: newUser._id , email: newUser.email , username: newUser.username } , JWT_SECRET_KEY);
    return res.status(201).cookie("token", token, {
        httpOnly: true,  // To Avoid using httpOnly cookie and store it in browser.
        // secure: true,    //Enabled in production as it sets for only HTTPS
        sameSite: "Lax",
        maxAge: 24*60*60*1000     //Cookie expires after 24 hours
    }).json({ email: email , username : username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get User Logic (To be implemented later)
export const getUser = (req, res) => {
  // Placeholder for future implementation
  res.status(200).json({ message: "Get User endpoint" });
};


export const validateUser = ( req, res ) => {
    const token = req.headers.authorization.split(" ")[1];
    try{
      const decodedData =jwt.verify(token, JWT_SECRET_KEY);
      res.status(200).json({ email: decodedData.email, username: decodedData.username });  //Send data if token is valid.
    }catch( err ){
      return res.status(403).json({ message: "Forbidden: Invalid token" }); //If invaid token send 403 status.
    }
}