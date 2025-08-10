const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yariga';

const connectDB = async () => {
  try {
    // Configure MongoDB options
    const options = {
      autoIndex: true, // Build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    // Create the connection
    const conn = await mongoose.connect(MONGODB_URI, options);

    console.log('=================================');
    console.log('🗄️  MongoDB Connection Status:');
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`📚 Database: ${conn.connection.name}`);
    console.log(`🔌 State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log('=================================');

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('🟢 MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.error('=================================');
    console.error('🔴 MongoDB Connection Error:');
    console.error(`❌ ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      console.error('❗ Please check if MongoDB is running on your system');
      console.error('👉 Try running: mongod --dbpath="path/to/data/directory"');
    }
    console.error('=================================');
    process.exit(1);
  }
};

module.exports = connectDB;
