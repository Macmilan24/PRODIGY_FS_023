import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "ModaMart_Admin",
    });

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
