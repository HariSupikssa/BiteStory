// backend/src/recipe-api.js
require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.SPOONACULAR_API_KEY;

// Search recipes
const searchRecipes = async (searchTerm, page) => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: API_KEY,
                query: searchTerm,
                number: 10,
                offset: (page - 1) * 10,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

// Get random recipes
const getRandomRecipes = async () => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                apiKey: API_KEY,
                number: 6,
            },
        });
        return response.data.recipes;
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        throw error;
    }
};

module.exports = { searchRecipes, getRandomRecipes };