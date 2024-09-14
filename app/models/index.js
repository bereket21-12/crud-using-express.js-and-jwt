const URL = require("../config/db-connection")
const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  
 await  mongoose
    .connect(URL.URL)
    .then(() => console.log("MongoDB connected!"))
    .catch((error) => console.error("Connection error:", error));
}


// Call the connect function
connectDB();

// Listen to mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from the database');
});