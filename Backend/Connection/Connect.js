import { mongoose } from "mongoose";

export const Connect = async () => {
    try{
        await mongoose.createConnection("mongodb://127.0.0.1:27017/authenticationDB");
        console.log("Database connection successful!");
    }catch( err ){
        console.log("Error in database connection!");
        process.exit(1);
    }

}