// import mongoose from "mongoose";
// import env from 'dotenv'

// env.config()
// MONGO_URL = process.env.MONGO_URL

// // export const ConnectDB = async () =>{
// //     await mongoose.connect('mongodb://localhost:27017/blogify');
// //     console.log("DB Connected");
// // }

import mongoose from "mongoose";
import env from "dotenv";

env.config();

const MONGO_URL = process.env.MONGO_URL; 

export const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {

        });

        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1);
    }
};
