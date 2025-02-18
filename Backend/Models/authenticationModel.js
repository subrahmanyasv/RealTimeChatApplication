//This module defines the schema for the database that stores user informations.

import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Needs hashing
});

// Hashing the password before its sent to db(so we are using pre method)
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password =await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model("User", userSchema);
export { User }