import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Explore = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY; // Use import.meta.env for Vite

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    const fetchPopularRecipes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`
            );
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error('Error fetching popular recipes:', error);
            setError('Failed to fetch popular recipes.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=9`
            );
            setRecipes(response.data.results);
        } catch (error) {
            console.error('Error searching recipes:', error);
            setError('Failed to search recipes.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title is-1 has-text-centered mt-5">Explore Recipes</h1>
            <form onSubmit={handleSearch} className="field has-addons is-justify-content-center my-5">
                <div className="control">
                    <input
                        type="text"
                        className="input black"
                        style={{ backgroundColor: "#FFFFFF", color: "" }}
                        placeholder="Search for recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="control">
                    <button type="submit" className="button sage-button is-medium" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>
            {error && <div className="notification is-danger">{error}</div>}
            {isLoading ? (
                <div className="has-text-centered">Loading...</div>
            ) : (
                <div className="columns is-multiline">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="column is-one-third">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={recipe.image} alt={recipe.title} />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <p className="title is-4">{recipe.title}</p>
                                    <p className="subtitle is-6">{recipe.sourceName || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;