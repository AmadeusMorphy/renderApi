const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optional: Enable CORS

require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8080; // Set port

// Enable CORS
app.use(cors());

// Connect to MongoDB
const MONGODB_CONNECT_URI = process.env.MONGODB_CONNECT_URI;

mongoose.connect(MONGODB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema for your data
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

// Create a model based on the schema
const User = mongoose.model('usersdb', userSchema); // Use the same collection name

// Define a GET API route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users); // Send the fetched users data
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: 'Error fetching users' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
