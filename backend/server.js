require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Add this line

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send('Email already registered');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Return user data (excluding password)
        const userData = { _id: user._id, name: user.name, email: user.email };
        res.status(201).send(userData);
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        // Return user data (excluding password)
        const userData = { _id: user._id, name: user.name, email: user.email };
        res.status(200).send(userData);
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});