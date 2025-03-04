import mongoose from 'mongoose';

const MONGO_URI = process.env.REACT_APP_MONGO_URI;
const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default ConnectDB;
