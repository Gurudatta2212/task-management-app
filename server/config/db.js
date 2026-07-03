import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected:", connection.connection.host);
  } catch (error) {
    console.error(error); // <-- error.message नाही, पूर्ण error print कर
    process.exit(1);
  }
};

export default connectDB;