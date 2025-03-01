import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/ChatApplication");
        console.log("Database connection successful!");
    }catch( err ){
        console.log("Error in database connection!");
        process.exit(1);
    }

}