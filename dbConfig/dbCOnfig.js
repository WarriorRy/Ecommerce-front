import mongoose from 'mongoose';

let isConnected = false; // Track if the app is connected to the database

export async function connect() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // Set to true after successful connection
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error. Please make sure MongoDB is running. ', error);
    process.exit(1); // Exit the process with an error code
  }
}
