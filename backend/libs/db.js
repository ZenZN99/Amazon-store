import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose.connect(url);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Fail", error);
    }
}