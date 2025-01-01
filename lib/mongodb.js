import mongoose from "mongoose";

let isConnected = false; // Track if the app is connected to MongoDB

export const connectMongoDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    // Make sure we are using the correct connection string
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
      throw new Error("MongoDB URI not provided in environment variables.");
    }

    // Use mongoose to connect to MongoDB
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(dbURI, dbOptions);
    isConnected = true;
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    isConnected = false;
    console.error("Error connecting to MongoDB:", error.message || error);
    // You can throw the error or handle it depending on your needs (e.g., retry mechanism)
  }
};

// Exporting the connection for usage elsewhere in the application
export default connectMongoDB;
