import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.DB_CONNECT, {
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });
    console.log(`Mongo DB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
