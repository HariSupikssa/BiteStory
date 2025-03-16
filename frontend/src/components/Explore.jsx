import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import heartOff from "../assets/heart-off.svg";
import heartOn from "../assets/heart-on.svg";
import "../public/style.css";

const Explore = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [likedRecipes, setLikedRecipes] = useState(new Set());
    const navigate = useNavigate(); // Initialize useNavigate

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

    useEffect(() => {
        fetchPopularRecipes();
        fetchLikedRecipes();
    }, []);

    // Fetch popular recipes from Spoonacular API
    const fetchPopularRecipes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`
            );
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error("Error fetching popular recipes:", error);
            setError("Failed to fetch popular recipes.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch liked recipes from your backend
    const fetchLikedRecipes = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await axios.get(`/api/favorites/${userId}`);
            setLikedRecipes(new Set(response.data.favorites));
        } catch (error) {
            console.error("Error fetching liked recipes:", error);
        }
    };

    // Handle search
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
            console.error("Error searching recipes:", error);
            setError("Failed to search recipes.");
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle liked status
    const toggleLike = async (recipeId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.error("User ID not found. Please log in.");
                return;
            }

            if (likedRecipes.has(recipeId)) {
                // Remove from favorites
                await removeLikedRecipe(recipeId);
                setLikedRecipes((prev) => {
                    const newLikedRecipes = new Set(prev);
                    newLikedRecipes.delete(recipeId);
                    return newLikedRecipes;
                });
            } else {
                // Add to favorites
                await addLikedRecipe(recipeId);
                setLikedRecipes((prev) => new Set(prev).add(recipeId));
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    // Add a recipe to liked recipes in the backend
    const addLikedRecipe = async (recipeId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await axios.post("/api/favorites", { userId, recipeId });
            console.log("Added to favorites:", response.data);
        } catch (error) {
            console.error("Error adding liked recipe:", error);
        }
    };

    // Remove a recipe from liked recipes in the backend
    const removeLikedRecipe = async (recipeId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await axios.delete("/api/favorites", { data: { userId, recipeId } });
            console.log("Removed from favorites:", response.data);
        } catch (error) {
            console.error("Error removing liked recipe:", error);
        }
    };

    // Navigate to Recipe component when a card is clicked
    const handleCardClick = (recipeId) => {
        console.log("Navigating to recipe:", recipeId); // Debugging
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="container">
            <h1 className="title is-1 has-text-centered mt-5">Explore Recipes</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="field has-addons is-justify-content-center my-5">
                <div className="field">
                    <div className="control has-icons-left">
                        <input
                            type="text"
                            placeholder="Search for recipes..."
                            className="input"
                            style={{ backgroundColor: "#FFFFFF" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="control">
                    <button type="submit" className="button sage-button is-medium" disabled={isLoading}>
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>

            {error && <div className="notification is-danger">{error}</div>}

            {isLoading ? (
                <div className="has-text-centered">Loading...</div>
            ) : (
                <div className="scrolling-wrapper">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="card sage-card"
                            onClick={() => handleCardClick(recipe.id)} // Add onClick handler
                            style={{ cursor: "pointer" }} // Change cursor to pointer
                        >
                            <div className="card-image" style={{ position: "relative" }}>
                                <figure className="image is-3by2">
                                    <img src={recipe.image} alt={recipe.title} />
                                </figure>
                                {/* Heart Button */}
                                <button
                                    className="heart-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click when heart is clicked
                                        toggleLike(recipe.id);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={likedRecipes.has(recipe.id) ? heartOn : heartOff}
                                        alt={likedRecipes.has(recipe.id) ? "Liked" : "Not Liked"}
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                </button>
                            </div>
                            <div className="card-content small-card-content">
                                <p className="title is-5">{recipe.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;