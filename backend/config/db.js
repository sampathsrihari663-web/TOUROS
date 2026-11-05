const mongoose = require('mongoose');

// Cache the connection across serverless function invocations
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('[MongoDB] Using cached connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/touros');
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
