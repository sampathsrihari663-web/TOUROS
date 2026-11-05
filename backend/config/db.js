const mongoose = require('mongoose');

// Cache connection promise across warm lambda invocations
let cachedConnection = null;

const connectDB = async () => {
  // If already connected, reuse existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If currently connecting, wait for existing promise
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/touros';
  console.log('[MongoDB] Initiating connection...');

  cachedConnection = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  }).then((conn) => {
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  }).catch((err) => {
    cachedConnection = null; // Reset so next request can retry
    console.error(`[MongoDB Error] Connection failed: ${err.message}`);
    throw err;
  });

  return cachedConnection;
};

module.exports = connectDB;
