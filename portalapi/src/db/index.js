import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/matecia_portal";
        await mongoose.connect(MONGO_URI); 
        console.log("DB connected successfully");
    } catch (err) {
        console.log("Mongo db connection eror", err);
        process.exit(1); // exit if connection fails
    }
}; 

export default connectDB;