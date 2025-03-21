require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { searchRecipes, getRandomRecipes } = require('./src/recipe-api'); // Import recipe-related functions

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [String], default: [] } // Array of recipe IDs
});

const User = mongoose.model('User', userSchema);

// Favorites Schema
const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    recipeId: { type: String, required: true }, // Recipe ID from Spoonacular API
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

// Register Route
app.post('/register', async (req, res) => {
    try {
        console.log("Received registration request:", req.body); // Debugging line
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging line
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully"); // Debugging line

        const user = new User({
            name,
            email,
            password: hashedPassword,
            favorites: [] // Explicitly set favorites to an empty array
        });
        console.log("User object before saving:", user); // Debugging line

        await user.save();
        console.log("User saved to database:", user); // Debugging line

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        console.log("Received login request:", req.body); // Debugging line
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("User found:", user); // Debugging line
        console.log("Stored password hash:", user.password); // Debugging line

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Include the user's favorites in the response
        const favorites = await Favorite.find({ userId: user._id });
        const recipeIds = favorites.map((favorite) => favorite.recipeId);

        res.status(200).json({ message: "Login successful", user, favorites: recipeIds });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Recipe Search Endpoint
app.get('/api/recipes/search', async (req, res) => {
    const { searchTerm, page } = req.query;
    try {
        const results = await searchRecipes(searchTerm, parseInt(page));
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

// Random Recipes Endpoint
app.get('/api/recipes/random', async (req, res) => {
    try {
        const recipes = await getRandomRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random recipes' });
    }
});

// Add a recipe to favorites
app.post('/api/favorites', async (req, res) => {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
        return res.status(400).json({ message: "Missing userId or recipeId" });
    }

    try {
        console.log("Adding recipe to favorites:", { userId, recipeId }); // Debugging line

        const existingFavorite = await Favorite.findOne({ userId, recipeId });
        if (existingFavorite) {
            console.log("Recipe already in favorites:", existingFavorite); // Debugging line
            return res.status(400).json({ message: "Recipe already in favorites" });
        }

        const favorite = new Favorite({ userId, recipeId });
        await favorite.save();
        console.log("Favorite saved to database:", favorite); // Debugging line

        // Update the user's favorites array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: recipeId } }, // Add recipeId to favorites array
            { new: true } // Return the updated document
        );
        console.log("User favorites updated:", updatedUser.favorites); // Debugging line

        res.status(201).json({ message: "Recipe added to favorites", favorite });
    } catch (error) {
        console.error("Error adding to favorites:", error);
        res.status(500).json({ message: "Failed to add to favorites" });
    }
});

// Remove a recipe from favorites
app.delete('/api/favorites', async (req, res) => {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
        return res.status(400).json({ message: "Missing userId or recipeId" });
    }

    try {
        console.log("Removing recipe from favorites:", { userId, recipeId }); // Debugging line

        await Favorite.deleteOne({ userId, recipeId });
        console.log("Favorite removed from database"); // Debugging line

        // Update the user's favorites array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: recipeId } }, // Remove recipeId from favorites array
            { new: true } // Return the updated document
        );
        console.log("User favorites updated:", updatedUser.favorites); // Debugging line

        res.status(200).json({ message: "Recipe removed from favorites" });
    } catch (error) {
        console.error("Error removing from favorites:", error);
        res.status(500).json({ message: "Failed to remove from favorites" });
    }
});

// Get all favorites for a user
app.get('/api/favorites/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "Missing userId" });
    }

    try {
        // Fetch all favorites for the user
        const favorites = await Favorite.find({ userId });
        const recipeIds = favorites.map((favorite) => favorite.recipeId);

        res.status(200).json({ favorites: recipeIds });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: "Failed to fetch favorites" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});