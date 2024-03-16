import mongoose, { connection } from "mongoose";

export async function connectToMongo() {
  try {
    const dbURI = process.env.DB_CONN!;
    console.log("Attempting to connect to mongo");
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    connectToMongo();
  }
}
