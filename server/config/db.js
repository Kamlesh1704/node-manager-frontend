import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.zeotqe3.mongodb.net/myNotebook?retryWrites=true&w=majority`;

const connectToMongo = async () => {
  try {
    const res = await mongoose.connect(URI);
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log("Some error occurred while connecting to the Database:", error.message);
  }
};

export default connectToMongo;
